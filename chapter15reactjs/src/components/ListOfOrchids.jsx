import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrchids, deleteOrchid } from "../services/orchidApi";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="50" height="50" fill="#e9ecef"/><text x="25" y="30" font-size="10" text-anchor="middle" fill="#6c757d">N/A</text></svg>'
  );

export default function ListOfOrchids() {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async (keyword = "") => {
    try {
      setLoading(true);
      const res = await getOrchids(keyword);
      setOrchids(res.data);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Không thể tải danh sách hoa lan!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadData(searchTerm);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa hoa lan: "${name}" không?`)) return;
    try {
      await deleteOrchid(id);
      await loadData(searchTerm);
    } catch (e) {
      alert("Xóa thất bại: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0 text-primary">Danh Sách Orchid</h3>
        <Link className="btn btn-success fw-bold" to="/orchids/new">
          + Thêm Hoa Lan
        </Link>
      </div>

      {/* Phần mở rộng: Tìm kiếm */}
      <form onSubmit={handleSearch} className="row g-2 mb-3">
        <div className="col-auto flex-grow-1">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên hoặc loại lan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-outline-primary">Tìm kiếm</button>
          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={() => { setSearchTerm(""); loadData(""); }}
          >
            Làm mới
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Đang tải dữ liệu từ Spring Boot API...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle table-bordered">
            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }}>ID</th>
                <th>Hình ảnh</th>
                <th>Tên Lan</th>
                <th>Phân loại</th>
                <th>Tự nhiên</th>
                <th>Hấp dẫn</th>
                <th style={{ width: "160px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orchids.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    Không tìm thấy hoa lan nào.
                  </td>
                </tr>
              ) : (
                orchids.map((o) => (
                  <tr key={o.orchidId}>
                    <td className="fw-bold">{o.orchidId}</td>
                    <td>
                      {o.orchidURL ? (
                        <img
                          src={o.orchidURL}
                          alt={o.orchidName}
                          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                          onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
                        />
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                    <td className="fw-semibold">{o.orchidName}</td>
                    <td><span className="badge bg-secondary">{o.orchidCategory}</span></td>
                    <td>
                      {o.isNatural ? (
                        <span className="badge bg-success">Yes</span>
                      ) : (
                        <span className="badge bg-light text-dark border">No</span>
                      )}
                    </td>
                    <td>
                      {o.isAttractive ? (
                        <span className="badge bg-warning text-dark">Attractive</span>
                      ) : (
                        <span className="badge bg-light text-muted border">Normal</span>
                      )}
                    </td>
                    <td>
                      <Link className="btn btn-sm btn-outline-warning me-2" to={`/orchids/${o.orchidId}/edit`}>
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(o.orchidId, o.orchidName)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
