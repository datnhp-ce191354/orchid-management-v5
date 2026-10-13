# Orchid_Mgnt_V5

Quản lý hoa lan: Spring Boot 3 (Java 21) + SQL Server + ReactJS (Vite).

## Cấu trúc
- `database/init.sql`  : script tạo DB `SBA301_OrchidDB` + seed data
- `chapter15api/`      : Backend Spring Boot (port 8080)
- `chapter15reactjs/`  : Frontend React Vite (port 5173)
- `BACKLOG.md`         : Product backlog & tiến độ

## Chạy dự án
1. Mở SSMS, chạy `database/init.sql`.
2. Sửa mật khẩu `sa` trong `chapter15api/src/main/resources/application.properties`.
3. **Chạy cả Backend và Frontend cùng lúc:**
   ```bash
   npm run dev
   # hoặc npm start
   ```
   - Backend chạy tại: http://localhost:8080
   - Frontend chạy tại: http://localhost:5173

4. *(Tùy chọn)* Chạy riêng lẻ:
   - Backend: `npm run server` (hoặc `cd chapter15api && mvn spring-boot:run`)
   - Frontend: `npm run client` (hoặc `cd chapter15reactjs && npm run dev`)


## API
| Method | URL | Mô tả |
|---|---|---|
| GET | /orchids?search=kw | Danh sách / tìm theo tên hoặc loại |
| GET | /orchids/{id} | Chi tiết |
| POST | /orchids | Thêm mới (201) |
| PUT | /orchids/{id} | Cập nhật (200) |
| DELETE | /orchids/{id} | Xóa (204) |
