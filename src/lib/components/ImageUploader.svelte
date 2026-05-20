<script lang="ts">
    import Toast from "./Toast.svelte";

    let fileInputRef: HTMLInputElement;
    let file: File | null = null;
    let status: string = "";
    let loading: boolean = false;
    let isDragging: boolean = false;
    export let uploadSuccess: boolean = false;
    let previewUrl: string | null = null;
    let hashtags: string = "";
    let hashtagList: string[] = [];
    let copied: boolean = false;
    let copyTimeout: ReturnType<typeof setTimeout> | null = null;

    let toastVisible: boolean = false;
    let toastMessage: string = "";
    let toastType: "success" | "danger" | "info" = "info";

    const showToast = (message: string, type: "success" | "danger" | "info") => {
        toastMessage = message;
        toastType = type;
        toastVisible = false;
        queueMicrotask(() => {
            toastVisible = true;
        });
    };

    const handleFileSelect = () => {
        if (!loading && fileInputRef) {
            fileInputRef.click();
        }
    };

    const processFile = (selectedFile: File) => {
        file = selectedFile;
        status = "";
        uploadSuccess = false;
        hashtags = "";
        hashtagList = [];
        copied = false;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        previewUrl = URL.createObjectURL(file);
        
        handleUpload();
    };

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            processFile(target.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        if (!loading) isDragging = true;
    };

    const handleDragLeave = () => {
        isDragging = false;
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        isDragging = false;
        
        if (loading) return;
        
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                processFile(droppedFile);
            } else {
                showToast("Please drop an image file.", "danger");
            }
        }
    };

    const handleUpload = async () => {
        if (!file || loading) return;

        loading = true;
        status = "Uploading Image...";

        try {
            const formData = new FormData();
            formData.append("image", file);

            const uploadRes = await fetch("/api/v1/upload/send", {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();

            if (!uploadRes.ok) {
                showToast(data.error || "Upload failed", "danger");
                status = "";
                loading = false;
                return;
            }

            const rawTags = data.hashtags ?? "";
            const rawList = Array.isArray(rawTags)
                ? rawTags.map((t: string) => t.trim())
                : String(rawTags).split(/\s+/).map(t => t.trim());
            hashtagList = rawList
                .map(t => t.replace(/^#+/, ""))
                .filter(Boolean);
            hashtags = hashtagList.map(t => `#${t}`).join(" ");

            status = "";
            uploadSuccess = true;
            loading = false;
            showToast("Upload successful!", "success");

        } catch (error) {
            showToast("Cannot connect to server API.", "danger");
            status = "";
            loading = false;
        }
    };

    const resetUploader = () => {
        file = null;
        status = "";
        uploadSuccess = false;
        loading = false;
        hashtags = "";
        hashtagList = [];
        copied = false;

        window.scrollTo({ top: 0, behavior: "smooth" });

        if (copyTimeout) {
            clearTimeout(copyTimeout);
            copyTimeout = null;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }

        if (fileInputRef) {
            fileInputRef.value = "";
        }
    };

    const copyHashtags = async () => {
        if (!hashtags) return;

        try {
            await navigator.clipboard.writeText(hashtags);
            copied = true;
            if (copyTimeout) clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => {
                copied = false;
                copyTimeout = null;
            }, 1500);
        } catch {
            console.log("Error")
        }
    };
</script>

<div class="image-uploader">
    <input
        bind:this={fileInputRef}
        type="file"
        accept="image/*"
        on:change={handleChange}
        hidden
        disabled={loading}
    />

    {#if uploadSuccess && previewUrl}
        <div class="result-container">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src={previewUrl} alt="Uploaded Image" class="preview-image" />
            
            {#if hashtagList.length > 0}
                <div class="hashtag-container">
                    <div class="hashtag-container-header">
                        <p class="hashtag-label">GENERATED TAGS</p>
                        <button
                            type="button"
                            class="hashtag-copy-btn"
                            class:copied
                            on:click={copyHashtags}
                            aria-label="Copy all hashtags"
                        >
                            {copied ? 'COPIED!' : 'COPY'}
                        </button>
                    </div>
                    <div class="hashtag-well">
                        {#each hashtagList as tag}
                            <div class="hashtag-chip">
                                <p class="hashtag-prefix">#</p>{tag}
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}

            <button class="primary-btn reset-btn" on:click={resetUploader}>Upload Another Image</button>
        </div>
    {:else}
        <!-- svelte-ignore a11y_no_static_element-interactions -->
        <div
            class="file-input-box {loading ? 'disabled' : ''} {isDragging ? 'dragging' : ''}"
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={handleDrop}
        >
            {#if file}
                <p>{file.name}</p>
            {:else}
                <img src="/icons/upload.svg" alt="Upload">
                <div class="file-input-box-inner-container">
                    <p class="main-instruction">Drag and drop an image here</p>
                    <p class="or">or</p>
                    <button class="primary-btn manual-btn" on:click={handleFileSelect} disabled={loading}>
                        Browse Files
                    </button>
                </div>
            {/if}
        </div>

        {#if loading}
            <div class="spinner"></div>
        {/if}
        {#if status}
            <p class="status">{status}</p>
        {/if}
        {#if file && !loading && !uploadSuccess}
            <button class="primary-btn reset-btn" on:click={resetUploader}>Upload Another Image</button>
        {/if}
    {/if}
</div>

<Toast bind:visible={toastVisible} message={toastMessage} type={toastType} duration={3000} />

<style>
    .image-uploader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
    }

    .file-input-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8rem 12rem;
        border-radius: 1rem;
        transition: all 0.3s ease;
        gap: 1.5rem;
        border: 0.15rem dotted var(--gray-600);
        background: linear-gradient(#36363630, #1c1c1c30);
    }

    .file-input-box-inner-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .spinner {
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
        border: 0.2rem solid var(--gray-100);
        border-top: 0.2rem solid var(--gray-600);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .disabled {
        opacity: 0.6;
        pointer-events: none;
    }

    .file-input-box.disabled {
        padding: 2rem 3rem;
    }

    .main-instruction {
        font-weight: 500;
        font-size: 1.25rem;
    }

    .or {
        font-weight: 300;
        font-size: 1.15rem;
    }

    .file-input-box.dragging {
        border-color: var(--primary-500);
        background: linear-gradient(#27b3cf26, #1c659a26);
    }
    
    .manual-btn {
        margin-top: 10px;
    }
    
    .result-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        padding: 2rem 5rem;
        border-radius: 1rem;
        border: 0.15rem dotted var(--gray-600);
        background: linear-gradient(#36363630, #1c1c1c30);
        width: 50%;
    }

    .preview-image {
        max-width: 100%;
        max-height: 300px;
        border-radius: 0.75rem;
        object-fit: contain;
    }

    .status {
        font-weight: 300;
        font-size: 1.15rem;
    }

    .hashtag-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        padding: 1.5rem;
        border-radius: 1.25rem;
        border: 0.01rem solid var(--gray-700);
        background: #1c1c1c60;
    }

    .hashtag-container-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        letter-spacing: 0.08em;
        font-weight: 500;
        font-size: 0.85rem;
        text-transform: uppercase;
    }

    .hashtag-label {
        color: var(--gray-300);
    }

    .hashtag-copy-btn {
        padding: 0.4rem 0.85rem;
        border-radius: 9999px;
        border: 0.01rem solid var(--gray-600);
        background: rgba(255, 255, 255, 0.05);
        color: var(--gray-100);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .hashtag-copy-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--primary-400);
        color: var(--primary-400);
        transform: translateY(-0.05rem);
    }

    .hashtag-copy-btn.copied {
        color: var(--success);
        border-color: rgba(86, 231, 127, 0.5);
        background: rgba(86, 231, 127, 0.08);
    }

    .hashtag-well {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        padding: 1.25rem;
        border-radius: 0.75rem;
        border: 0.01rem solid var(--gray-800);
        background: #1c1c1c60;
    }

    .hashtag-prefix {
        display: inline-block;
        opacity: 0.75;
        margin-right: 0.1rem;
    }

    .hashtag-chip {
        flex: 1 1 auto;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        border: 0.01rem solid var(--gray-700);
        background: #36363650;
        color: var(--primary-400);
        font-family: Poppins, sans-serif;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
    }

</style>
