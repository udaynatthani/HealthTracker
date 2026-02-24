import { useState } from "react";
import { uploadCSV } from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .upload-wrapper {
    font-family: 'DM Sans', sans-serif;
  }

  .upload-zone {
    border: 2px dashed rgba(74, 222, 128, 0.25);
    border-radius: 16px;
    padding: 36px 24px;
    text-align: center;
    background: rgba(74, 222, 128, 0.03);
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
    position: relative;
  }

  .upload-zone:hover,
  .upload-zone.has-file {
    border-color: rgba(74, 222, 128, 0.5);
    background: rgba(74, 222, 128, 0.06);
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
    font-size: 32px;
    margin-bottom: 10px;
  }

  .upload-zone-title {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    margin: 0 0 4px;
  }

  .upload-zone-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    margin: 0;
  }

  .upload-filename {
    margin-top: 10px;
    font-size: 13px;
    color: #4ade80;
    font-weight: 500;
  }

  .upload-btn {
    width: 100%;
    margin-top: 16px;
    padding: 13px;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    border: none;
    border-radius: 12px;
    color: #052e10;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(74, 222, 128, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .upload-btn:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(74, 222, 128, 0.3);
  }

  .upload-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .upload-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(5,46,16,0.3);
    border-top-color: #052e10;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadCSV(formData);
      alert(res.message || "Uploaded");
      await onUpload();
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
            <div className="upload-icon">📂</div>
            <p className="upload-zone-title">
              {file ? "File selected" : "Drop your CSV here"}
            </p>
            <p className="upload-zone-sub">
              {file ? "" : "or click to browse"}
            </p>
            {file && <p className="upload-filename">{file.name}</p>}
          </div>

          <button className="upload-btn" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="upload-spinner" />
                Uploading...
              </>
            ) : (
              <>↑ Upload CSV</>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadForm;