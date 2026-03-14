import { useState } from "react";
import { uploadCSV } from "../services/api";

const styles = `
  .upload-wrapper {
    font-family: inherit;
  }

  .upload-zone {
    border: 2px dashed #d1d1d6;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    background: #fdfdfd;
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    margin-bottom: 16px;
  }

  .upload-zone:hover,
  .upload-zone.has-file {
    border-color: #ff2d55;
    background: #fffafa;
  }

  .upload-zone input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .upload-icon {
    font-size: 28px;
    margin-bottom: 8px;
    color: #ff2d55;
  }

  .upload-zone-title {
    font-size: 14px;
    font-weight: 500;
    color: #1c1c1e;
    margin: 0 0 4px;
  }

  .upload-zone-sub {
    font-size: 13px;
    color: #8e8e93;
    margin: 0;
  }

  .upload-filename {
    margin-top: 10px;
    font-size: 13px;
    color: #ff2d55;
    font-weight: 600;
  }

  .upload-btn {
    width: 100%;
    padding: 14px;
    background: #ff2d55;
    border: none;
    border-radius: 14px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .upload-btn:hover:not(:disabled) {
    transform: scale(0.98);
    opacity: 0.9;
  }

  .upload-btn:disabled {
    background: #e5e5ea;
    color: #8e8e93;
    cursor: not-allowed;
    transform: none;
  }

  .upload-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadCSV(formData);
      alert(res.message || "Uploaded");
      setFile(null); // Clear file after successful upload
      if (onUpload) {
          await onUpload();
      }
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="upload-wrapper">
        <form onSubmit={handleSubmit}>
          <div className={`upload-zone ${file ? "has-file" : ""}`}>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <div className="upload-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
            </div>
            <p className="upload-zone-title">
              {file ? "File ready" : "Upload Data"}
            </p>
            <p className="upload-zone-sub">
              {file ? "" : "Tap to browse records"}
            </p>
            {file && <p className="upload-filename">{file.name}</p>}
          </div>

          <button className="upload-btn" type="submit" disabled={loading || !file}>
            {loading ? (
              <>
                <span className="upload-spinner" />
                Processing...
              </>
            ) : (
              <>Add Records</>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadForm;