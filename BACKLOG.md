# PRODUCT BACKLOG & TIẾN ĐỘ THỰC HIỆN - ORCHID_MGNT_V5

## Quy trình kiểm tra của Nhóm trưởng (Scrum Master / Team Lead):
- **Thời điểm kiểm tra:** Hàng tuần trước buổi học 24h (Tối Chủ Nhật hoặc tối trước ngày học).
- **Hạng mục rà soát:**
  1. Kiểm tra trạng thái từng Use Case (UC) trên Git commit history.
  2. Xác nhận trạng thái: `Xong` (đã pass test độc lập và test tích hợp), `Đang làm`, hoặc `Trễ` (vượt quá End Date).
  3. Tổng hợp danh sách blocker/bug để báo cáo hiện trạng đầu giờ với giảng viên.

---

## Danh sách Sprint / Iteration

### Sprint 1: Khởi tạo Hệ thống & Cấu hình Nền tảng (Báo cáo Tuần 1)
| UC ID | Tên Use Case / Chức năng | Thành viên | Bắt đầu | Kết thúc | Hiện trạng | Ghi chú nghiệm thu |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **UC-01** | Thiết lập CSDL SQL Server & Seed Data | Thành viên A | 08/10/2026 | 09/10/2026 | **Xong** | Script tạo DB chạy chuẩn, bảng có 3+ records |
| **UC-02** | Khởi tạo Spring Boot 3 API & Entity JPA | Thành viên B | 08/10/2026 | 10/10/2026 | **Xong** | Connect thành công DB qua port 1433 |
| **UC-03** | Cấu hình CORS & RESTful CRUD Service | Thành viên B | 09/10/2026 | 10/10/2026 | **Xong** | Postman pass các methods (GET, POST, PUT, DELETE) |
| **UC-04** | Khởi tạo Frontend Vite React & Router | Thành viên C | 09/10/2026 | 11/10/2026 | **Xong** | Cấu hình Axios baseURL và Bootstrap |

### Sprint 2: Tích hợp Toàn diện & Mở rộng Chức năng (Báo cáo Tuần 2)
| UC ID | Tên Use Case / Chức năng | Thành viên | Bắt đầu | Kết thúc | Hiện trạng | Ghi chú nghiệm thu |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **UC-05** | Giao diện hiển thị danh sách Orchid (Read) | Thành viên C | 11/10/2026 | 12/10/2026 | **Xong** | Hiển thị table, load dynamic từ API |
| **UC-06** | Form Thêm mới / Cập nhật Orchid (Create/Update) | Thành viên C | 11/10/2026 | 12/10/2026 | **Xong** | Xử lý Form checkbox (isNatural, isAttractive) |
| **UC-07** | Chức năng Xóa Orchid (Delete) kèm Confirm | Thành viên B | 11/10/2026 | 12/10/2026 | **Xong** | Xóa DB và reload UI tự động |
| **UC-08** | [Mở rộng] Tìm kiếm & Lọc danh mục Orchid | Thành viên A | 12/10/2026 | 12/10/2026 | **Xong** | Tìm kiếm theo tên & category ngay trên UI |
| **UC-09** | [Fix lỗi] Xử lý CORS, Binding Boolean & Validation | Cả nhóm | 12/10/2026 | 12/10/2026 | **Xong** | Đóng gói Test Matrix & hoàn thiện Lab 5 |

## Git Convention
```
[<UC_ID>][<Loại_Công_Việc>] <Tên UC>: <Nội dung chi tiết> (<Tên thành viên>)
```
Loại: `feat`, `fix`, `chore`, `docs`, `refactor`.

## Bảng lỗi đã xử lý
| Mã | Triệu chứng | Nguyên nhân | Khắc phục |
|---|---|---|---|
| ERR-01 (CORS) | Browser báo blocked by CORS policy | Backend chưa allow port 5173 | `CorsConfig.java` allow `http://localhost:5173` |
| ERR-02 (Jackson) | `isNatural` bị false / sai | Jackson đổi tên boolean `isNatural` -> `natural` | `@JsonProperty("isNatural")`, `@JsonProperty("isAttractive")` |
| ERR-03 (Connection Refused) | `ERR_CONNECTION_REFUSED` | Sai cổng `.env` hoặc backend chưa chạy | Chạy `mvn spring-boot:run`, restart Vite sau khi sửa `.env` |
| ERR-04 (SQL Identity) | Cannot insert explicit value for identity column | Payload POST kèm `orchidId` | `orchid.setOrchidId(null)` trong `insertOrchid()` |
