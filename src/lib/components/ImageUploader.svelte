<script lang="ts">
    let fileInputRef: HTMLInputElement;
    let file: File | null = null;
    let status: string = "";
    let loading: boolean = false;
    let isDragging: boolean = false;
    let uploadSuccess: boolean = false;
    let uploadFailed: boolean = false;
    let previewUrl: string | null = null;
    let hashtags: string = "";

    const handleFileSelect = () => {
        if (!loading && fileInputRef) {
            fileInputRef.click();
        }
    };

    const processFile = (selectedFile: File) => {
        file = selectedFile;
        status = "";
        uploadSuccess = false;
        uploadFailed = false;
        hashtags = "";

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
                status = "Please drop an image file.";
                uploadFailed = true;
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

            const uploadRes = await fetch("http://localhost:8000/api/v1/upload/send", {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();

            if (!uploadRes.ok) {
                status = data.error || "Upload failed";
                loading = false;
                uploadFailed = true;
                return;
            }
            
            hashtags = data.hashtags || "";
            if (Array.isArray(hashtags)) {
                hashtags = hashtags.join(" ");
            }

            status = "Upload successful!";
            uploadSuccess = true;
            loading = false;

        } catch (error) {
            status = "Cannot connect to server API.";
            loading = false;
            uploadFailed = true;
        }
    };

    const resetUploader = () => {
        file = null;
        status = "";
        uploadSuccess = false;
        uploadFailed = false;
        loading = false;
        hashtags = "";
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }
        if (fileInputRef) {
            fileInputRef.value = "";
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
            <p class="status success">{status}</p>
            <!-- <h3>Image Uploaded Successfully</h3> -->
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src={previewUrl} alt="Uploaded Image" class="preview-image" />
            
            {#if hashtags}
                <div class="hashtags-container">
                    <p class="hashtags-output">{hashtags}</p>
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
        <p class="status {uploadFailed ? 'danger' : ''}">{status}</p>
    {/if}
</div>

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
        padding: 4rem 7rem;
        border-radius: 1rem;
        transition: all 0.3s ease;
        gap: 1.5rem;
        border: 0.2rem dotted var(--gray-100);
        background: linear-gradient(#36363626, #1c1c1c26);
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
        border: 0.2rem dotted var(--gray-100);
        background: linear-gradient(#36363626, #1c1c1c26);
    }

    .preview-image {
        max-width: 100%;
        max-height: 300px;
        border-radius: 0.5rem;
        object-fit: contain;
    }

    .hashtags-container {
        padding: 1rem;
        background-color: var(--gray-100, #f7f7f7);
        border-radius: 0.5rem;
        width: 100%;
        text-align: center;
    }

    .hashtags-output {
        font-weight: 500;
        font-size: 1rem;
        color: var(--gray-700, #333);
        word-break: break-word;
        margin: 0;
    }

    .status {
        font-weight: 300;
        font-size: 1.15rem;
    }

    .status.success {
        color: var(--success);
        font-weight: 300;
        font-size: 1.15rem;
    }

    .status.danger {
        color: var(--danger);
        font-weight: 300;
        font-size: 1.15rem;
    }
</style>
