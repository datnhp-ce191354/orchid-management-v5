import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createOrchid, getOrchid, updateOrchid } from "../services/orchidApi";

const initialForm = {
  orchidName: "",
  isNatural: false,
  orchidDescription: "",
  orchidCategory: "",
  isAttractive: false,
  orchidURL: "",
};

export default function EditOrchid({ createMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!createMode && id) {
      getOrchid(id)
        .then((res) => setForm(res.data))
        .catch((err) => setError("Không tìm thấy thông tin hoa lan: " + err.message));
    }
  }, [createMode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.orchidName.trim()) {
      setError("Tên hoa lan không được để trống!");
      return;
    }
    setSubmitting(true);
    try {
      if (createMode) {
        await createOrchid(form);
      } else {
        await updateOrchid(id, form);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Có lỗi xảy ra khi lưu dữ liệu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 col-md-8 mx-auto">
      <h3 className="mb-3 text-primary">{createMode ? "Thêm Mới Hoa Lan" : `Chỉnh Sửa Hoa Lan #${id}`}</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Tên Hoa Lan (*)</label>
          <input
            className="form-control"
            name="orchidName"
            value={form.orchidName ?? ""}
            onChange={handleChange}
            placeholder="Ví dụ: Cattleya White..."
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Danh Mục / Loại (*)</label>
          <input
            className="form-control"
            name="orchidCategory"
            value={form.orchidCategory ?? ""}
            onChange={handleChange}
            placeholder="Ví dụ: Cattleya, Dendrobium..."
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Mô Tả</label>
          <textarea
            rows="3"
            className="form-control"
            name="orchidDescription"
            value={form.orchidDescription ?? ""}
            onChange={handleChange}
            placeholder="Mô tả đặc điểm hoa lan..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Đường Dẫn Hình Ảnh (URL)</label>
          <input
            className="form-control"
            name="orchidURL"
            value={form.orchidURL ?? ""}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="isNatural"
            id="isNatural"
            checked={!!form.isNatural}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isNatural">
            Lan Tự Nhiên (Natural)
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="isAttractive"
            id="isAttractive"
            checked={!!form.isAttractive}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isAttractive">
            Hấp Dẫn (Attractive)
          </label>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success px-4" type="submit" disabled={submitting}>
            {submitting ? "Đang lưu..." : "Lưu Dữ Liệu"}
          </button>
          <Link className="btn btn-outline-secondary" to="/">
            Hủy Bỏ
          </Link>
        </div>
      </form>
    </div>
  );
}
