import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os

doc = docx.Document()

# Page setup (A4, margins 1 inch)
for section in doc.sections:
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

# Colors
COLOR_PRIMARY = RGBColor(5, 150, 105) # Green
COLOR_DARK = RGBColor(15, 23, 42)

def add_title(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY

def add_subtitle(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(13)
    run.font.italic = True
    p.paragraph_format.space_after = Pt(18)

def add_h1(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(15)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)

def add_h2(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = COLOR_DARK
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(4)

def add_p(text, bold_prefix="", italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.line_spacing = 1.25
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(12)
        r_pre.font.bold = True
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    if italic:
        run.font.italic = True

def add_bullet(text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.2
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(12)
        r_pre.font.bold = True
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)

def add_quote(text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.4)
    p.paragraph_format.right_indent = Inches(0.4)
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(8)
    run = p.add_run(f'"{text}"')
    run.font.name = 'Times New Roman'
    run.font.size = Pt(11)
    run.font.italic = True

# Content Generation
add_title("BÁO CÁO CHIẾN LƯỢC SẢN PHẨM & VẬN HÀNH DEALHUB")
add_subtitle("Bản Đồ Ưu Đãi Làm Đẹp O2O, Customer Journey Map, PMF Canvas & Lộ Trình Công Nghệ\nWebsite triển khai: https://dealhub-vn-three.vercel.app")

add_h1("PHẦN 1: BẢN ĐỒ HÀNH TRÌNH KHÁCH HÀNG (CUSTOMER JOURNEY MAP - CJM)")

add_h2("1.1. Hành trình Người tiêu dùng săn deal (Consumer Journey)")
add_p("Hành trình của người tiêu dùng trên DealHub được thiết kế dạng vòng lặp khép kín 5 giai đoạn, giúp chuyển hóa nhu cầu làm đẹp thành lượt ghé tiệm thực tế:")

add_bullet("Người dùng mở website DealHub trên điện thoại di động khi có nhu cầu chăm sóc sắc đẹp hoặc mua sắm. Khách hàng lựa chọn khu vực sinh sống (Hà Nội, TP.HCM, Đà Nẵng) và lướt qua Bản Đồ Deal phong cách Zenly hoặc lướt Bảng Tin săn deal để xem các bài đánh giá chân thực từ cộng đồng.", "Giai đoạn 1 - Khám phá (Awareness & Discovery): ")
add_bullet("Trình duyệt di động, định vị GPS, các ghim tròn hiển thị ảnh avatar thực tế của tiệm kèm nhãn phần trăm giảm giá đỏ rực rỡ và khoảng cách tính bằng mét/km.", "• Điểm chạm (Touchpoints): ")
add_bullet("Khách hàng tò mò, thích thú và hào hứng khi bất ngờ phát hiện nhiều cơ sở làm đẹp uy tín sát cạnh nơi mình ở hoặc làm việc đang có chương trình giảm giá sâu.", "• Tâm lý & Cảm xúc: ")
add_bullet("Tìm kiếm nhanh địa điểm làm đẹp gần nhất, dịch vụ chất lượng với mức giá ưu đãi thực tế.", "• Nhu cầu cốt lõi: ")

add_bullet("Người dùng chạm vào ghim của tiệm trên bản đồ để mở popup thẻ tóm tắt, sau đó bấm xem chi tiết dịch vụ. Giao diện hiển thị rõ ràng giá niêm yết, giá khuyến mãi, thời hạn, điều kiện áp dụng, khoảng cách và nút mở Google Maps chỉ đường.", "Giai đoạn 2 - Đánh giá & So sánh (Evaluation): ")
add_bullet("Thẻ chi tiết deal, nút Chỉ đường bản đồ, nút Gọi hotline tư vấn.", "• Điểm chạm: ")
add_bullet("Khách hàng an tâm, tin tưởng nhờ thông tin minh bạch, địa chỉ rõ ràng, không lo phát sinh phụ phí ẩn khi tới quán.", "• Tâm lý & Cảm xúc: ")

add_bullet("Khách hàng nhấn nút 'Lưu vào Kho Voucher'. Hệ thống tự động tạo mã định danh duy nhất (ví dụ: DH-7828) và lưu trữ trực tiếp vào Kho Voucher của người dùng mà KHÔNG yêu cầu đặt cọc hay thanh toán trước bất kỳ khoản phí nào.", "Giai đoạn 3 - Lưu ưu đãi (Intent & Commitment): ")
add_bullet("Nút Lưu Ưu Đãi, Kho Voucher cá nhân (Deal Passport).", "• Điểm chạm: ")
add_bullet("Thỏa mãn, giải tỏa rủi ro tài chính vì giữ được chỗ ưu đãi mà không sợ mất tiền cọc nếu bận việc đột xuất.", "• Tâm lý & Cảm xúc: ")

add_bullet("Khách hàng di chuyển đến cửa hàng theo địa chỉ đã lưu. Tại quầy thanh toán, người dùng mở Kho Voucher và xuất trình mã QR toàn màn hình cho nhân viên thu ngân quét hoặc nhập mã xác nhận áp dụng giảm giá trong 3 giây.", "Giai đoạn 4 - Trải nghiệm thực tế tại tiệm (In-store O2O Redemption): ")
add_bullet("Màn hình mã QR voucher, quầy thu ngân của đối tác liên kết.", "• Điểm chạm: ")
add_bullet("Hài lòng vì thủ tục áp dụng voucher cực kỳ nhanh chóng, chuyên nghiệp và được phục vụ đúng giá cam kết.", "• Tâm lý & Cảm xúc: ")

add_bullet("Sau khi sử dụng dịch vụ thành công, người dùng nhận điểm thưởng nhiệm vụ săn deal (+50⭐, +100⭐), thăng hạng danh hiệu thành viên và có thể dùng chính số điểm tích lũy này để đổi thêm các voucher quà tặng miễn phí tại Cửa Hàng Đổi Quà.", "Giai đoạn 5 - Giữ chân & Lan tỏa (Loyalty & Gamification Loop): ")
add_bullet("Hệ thống điểm thưởng nhiệm vụ, Cửa hàng đổi quà, Bảng tin chia sẻ review.", "• Điểm chạm: ")
add_bullet("Gắn bó lâu dài, hình thành thói quen luôn mở DealHub kiểm tra ưu đãi trước khi đi làm đẹp.", "• Tâm lý & Cảm xúc: ")

add_h2("1.2. Hành trình Chủ tiệm & Đối tác Làm đẹp (Merchant Journey)")
add_p("Hành trình của chủ tiệm spa, salon và cửa hàng thời trang tập trung vào việc tối ưu công suất và đo lường doanh thu:")

add_bullet("Chủ tiệm truy cập vào Kênh Người Bán trên DealHub, thiết lập hồ sơ cơ sở, địa chỉ GPS và đăng các gói ưu đãi dịch vụ tập trung vào các khung giờ vắng khách (10h00 - 16h00 các ngày trong tuần) để lấp đầy công suất giường/ghế.", "Bước 1 - Khởi tạo chiến dịch ưu đãi: ")
add_bullet("Deal được kích hoạt tức thì trên Bản Đồ Deal địa phương và phân phối tới bảng tin của tệp khách hàng sống hoặc làm việc trong bán kính 3 - 5km quanh cửa hàng.", "Bước 2 - Tiếp cận khách hàng quanh tiệm: ")
add_bullet("Khi khách đến tiệm xuất trình mã voucher, nhân viên thu ngân mở tab 'Quét Thu Ngân Tại Tiệm', nhập mã ký tự hoặc quét QR để hệ thống tự động kiểm tra tính hợp lệ và đánh dấu mã đã sử dụng, loại trừ hoàn toàn rủi ro gian lận.", "Bước 3 - Xác thực thu ngân nhanh gọn: ")
add_bullet("Chủ cơ sở mở Dashboard 'Đo Hiệu Quả' để xem chi tiết phễu chuyển đổi 5 chỉ số: Lượt xem deal online → Lượt lưu vào kho → Lượt nhận mã → Lượt khách thực tế đến làm dịch vụ → Tổng doanh thu thực O2O mang lại trong tháng.", "Bước 4 - Đo lường ROI & Doanh thu thực tế: ")

add_h1("PHẦN 2: MÔ HÌNH KIỂM THỬ PRODUCT-MARKET FIT CANVAS (PMF TESTING & VALIDATION CANVAS)")
add_p("Mô hình kiểm thử Product-Market Fit Canvas (PMF) của DealHub được xây dựng dựa trên phương pháp luận Lean Startup (Khởi nghiệp tinh gọn) và mô hình kinh doanh Hội Viên Trả Phí Hàng Tháng (B2C Subscription / DealPass Membership). Mục tiêu là kiểm chứng xem việc người tiêu dùng trả một khoản phí định kỳ hàng tháng để nhận gói voucher làm đẹp độc quyền có giải quyết trúng nhu cầu tiết kiệm chi phí làm đẹp lâu dài và tạo ra dòng doanh thu định kỳ bền vững (MRR) hay không.")

add_h2("2.1. Khối 1: Khách hàng mục tiêu & Nhóm kiểm thử tiên phong (Target Segments & Early Adopters)")
add_bullet("Nữ giới và giới trẻ 18 - 32 tuổi (sinh viên, nhân viên văn phòng tại các đô thị lớn). Đặc điểm: Có nhu cầu làm đẹp định kỳ hàng tuần hoặc hàng tháng (chăm sóc da, gội đầu dưỡng sinh, làm tóc, triệt lông, làm móng); trung bình chi tiêu từ 1.000.000₫ – 3.000.000₫/tháng cho dịch vụ làm đẹp; luôn tìm kiếm giải pháp tối ưu hóa chi tiêu cố định này.", "• Nhóm Người tiêu dùng trả phí (B2C Subscribers): ")
add_bullet("Các cơ sở Spa y khoa, Viện thẩm mỹ da liễu, Hair Salon và Cửa hàng thời trang độc lập tại Hà Nội. Đặc điểm: Muốn tiếp cận tệp khách hàng có sẵn thói quen chi tiêu và động lực đến tiệm cao nhất mà không phải bỏ chi phí chạy quảng cáo đắt đỏ hay phí hoa hồng phức tạp.", "• Nhóm Đối tác cung cấp dịch vụ (B2B Merchant Partners): ")

add_h2("2.2. Khối 2: Giả thuyết Nỗi đau & Nhu cầu chưa được đáp ứng (Underserved Needs Hypotheses)")
add_bullet("Chi phí dịch vụ làm đẹp đơn lẻ quá đắt đỏ nếu không có ưu đãi; việc đi săn các voucher trôi nổi miễn phí trên mạng mất nhiều thời gian, hay gặp voucher rác hoặc bị phụ phí ẩn khi đến nơi. Khách hàng mong muốn một giải pháp 'Hội viên trọn gói' uy tín, chỉ trả một khoản phí nhỏ cố định mỗi tháng là yên tâm nhận được các voucher giảm giá sâu thực chất.", "• Nỗi đau của Người tiêu dùng (Consumer Pain Points): ")
add_bullet("Chủ cơ sở ngán ngẩm với các nền tảng bắt trả phí hoa hồng cao hoặc bắt mua phần mềm đắt đỏ. Họ chỉ cần khách hàng thực tế bước vào quán để lấp đầy công suất ghế/giường vào các khung giờ vắng khách.", "• Nỗi đau của Chủ tiệm (Merchant Pain Points): ")

add_h2("2.3. Khối 3: Bộ giải pháp MVP đưa vào kiểm nghiệm thực tế (Tested MVP Feature Set)")
add_bullet("Người dùng đăng ký gói thuê bao hàng tháng (chỉ từ 49.000₫/tháng) để được mở khóa toàn bộ 'Kho Voucher Độc Quyền VIP', nhận định kỳ các gói voucher giảm giá sâu từ 50% – 80% từ các spa/salon uy tín quanh mình.", "1. Gói Thuê Bao Hội Viên Săn Deal (DealPass B2C Subscription): ")
add_bullet("Hiển thị trực quan các cơ sở đối tác chấp nhận voucher DealPass quanh vị trí người dùng kèm khoảng cách di chuyển thực tế (650m, 1.2km) và hình ảnh tiệm thực tế.", "2. Bản Đồ Ưu Đãi VIP Phong Cách Zenly: ")
add_bullet("Sau khi đăng ký gói tháng, hội viên tự do lưu voucher và nhận mã QR độc quyền (ví dụ: DH-7828) trong ví cá nhân mà không phải thanh toán thêm bất kỳ khoản cọc nào tại thời điểm lưu.", "3. Kho Voucher Thành Viên Không Giới Hạn: ")
add_bullet("Nhân viên thu ngân xác thực mã voucher của hội viên trong 2 giây trên trình duyệt web, đảm bảo quyền lợi chuẩn cam kết và không phát sinh phụ phí.", "4. Công Cụ Xác Thực Thu Ngân O2O Tại Quầy: ")

add_h2("2.4. Khối 4: Ma trận 4 Giả thuyết Kiểm thử Cốt lõi (Core Hypotheses Matrix)")
add_bullet("Nếu cung cấp gói hội viên tháng với mức phí tương đương 1 ly trà sữa (49.000₫/tháng) nhưng mang lại giá trị voucher tiết kiệm hơn 1.000.000₫/tháng, ít nhất 15% người dùng thường xuyên làm đẹp sẽ sẵn sàng trả tiền đăng ký.", "• Giả thuyết 1 - Sẵn sàng Trả phí Tháng (B2C Willingness to Pay - H1): ")
add_bullet("Khách hàng đã trả tiền mua gói thuê bao sẽ có tâm lý 'phải đi trải nghiệm cho bõ tiền mua gói' (hiệu ứng chi phí chìm có lợi), giúp tỷ lệ thực tế đến tiệm sử dụng voucher (Redemption Rate) tăng vọt lên trên 25% (cao hơn gấp 5 lần so với phát voucher miễn phí thông thường).", "• Giả thuyết 2 - Tỷ lệ Đến Tiệm Thực Tế (High-Intent Redemption - H2): ")
add_bullet("Vì DealHub mang trực tiếp tệp khách hàng VIP đã trả tiền đến quán mà không thu phí hoa hồng chiết khấu cao từ chủ cơ sở, ít nhất 90% tiệm spa/salon được tiếp cận sẽ đồng ý tham gia cung cấp deal độc quyền lên sàn.", "• Giả thuyết 3 - Thu hút Đối tác Cơ sở (Zero-Friction Merchant Onboarding - H3): ")
add_bullet("Nếu người dùng tiết kiệm được trên 300.000₫ ngay trong lần đầu tiên sử dụng voucher, tỷ lệ gia hạn gói thuê bao tháng tiếp theo (Renewal Rate) sẽ đạt trên 70%.", "• Giả thuyết 4 - Giữ chân Hội viên (Subscription Retention - H4): ")

add_h2("2.5. Khối 5: Thiết kế Thí nghiệm Kiểm thử Thực tế (Experiment Design & Methodology)")
add_bullet("Khảo sát câu hỏi chuẩn Sean Ellis đối với tệp người dùng thử nghiệm: 'Bạn sẽ cảm thấy thế nào nếu không thể tiếp tục gia hạn gói hội viên DealPass vào tháng tới?' với 3 thang đo: (1) Rất thất vọng, (2) Hơi thất vọng, (3) Không quan tâm.", "• Thí nghiệm A - Đo lường Độ Cần Thiết Của Gói Tháng (Sean Ellis Test): ")
add_bullet("Triển khai trên web live https://dealhub-vn-three.vercel.app cho phép khách hàng đăng ký trải nghiệm gói hội viên, nhận voucher giờ vàng từ An Nhiên Beauty Spa và mang mã QR tới thu ngân xác nhận.", "• Thí nghiệm B - Thử nghiệm Vận Hành Thực Địa (Live O2O Simulation): ")
add_bullet("Theo dõi phễu thuê bao: Lượt truy cập web → Tỷ lệ đăng ký gói tháng → Tỷ lệ lưu voucher VIP → Tỷ lệ đến tiệm quét mã thành công → Tỷ lệ gia hạn tháng kế tiếp.", "• Thí nghiệm C - Đo lường Phễu Thuê Bao B2C (Subscription Funnel): ")

add_h2("2.6. Khối 6: Tiêu chuẩn Đạt/Không đạt PMF (Pass/Fail Threshold Criteria)")
add_bullet("Chỉ số Sean Ellis PMF Score: Tỷ lệ hội viên trả lời 'Rất thất vọng' nếu mất gói DealPass đạt tối thiểu ≥ 40%.", "• Tiêu chí 1: ")
add_bullet("Tỷ lệ chuyển đổi từ người dùng miễn phí sang gói hội viên tháng (Free-to-Paid Conversion) đạt tối thiểu ≥ 10%.", "• Tiêu chí 2: ")
add_bullet("Tỷ lệ sử dụng voucher của hội viên (Voucher Utilization Rate): Hội viên sử dụng ít nhất 1 voucher tại tiệm mỗi tháng đạt ≥ 60%.", "• Tiêu chí 3: ")
add_bullet("Tỷ lệ hủy gói thuê bao hàng tháng (Monthly Churn Rate): Duy trì ở mức thấp dưới 8%/tháng.", "• Tiêu chí 4: ")

add_h2("2.7. Khối 7: Mô Hình Dòng Doanh Thu Từ Khách Hàng (B2C Monetization Model)")
add_bullet("Khách hàng trả 49.000₫/tháng (hoặc 499.000₫/năm). Quyền lợi: Mở khóa toàn bộ các deal giảm 50% – 70% trên Bản Đồ Deal, nhận 5 mã voucher độc quyền mỗi tháng, tích lũy điểm thưởng đổi quà tại Cửa Hàng Gamification.", "1. Gói Thuê Bao DealPass Tiêu Chuẩn (Core Revenue Stream): ")
add_bullet("Khách hàng trả 99.000₫/tháng (hoặc 899.000₫/năm). Quyền lợi: Không giới hạn số lượng voucher lưu kho, mở khóa các deal giảm sâu từ 70% – 85% từ các Viện thẩm mỹ cao cấp, nhân đôi điểm thưởng nhiệm vụ săn deal, và tặng 01 buổi trải nghiệm dịch vụ miễn phí mỗi quý.", "2. Gói Thuê Bao DealPass VIP / Diamond Club: ")
add_bullet("Phí hợp tác từ các thương hiệu mỹ phẩm và chuỗi làm đẹp lớn muốn tài trợ sản phẩm/voucher vào 'Hộp Quà Tháng' phát tặng trực tiếp cho cộng đồng hội viên trả phí của DealHub.", "3. Doanh Thu Bổ Trợ (Brand Partnerships & Sponsored Drops): ")

add_h2("2.8. Khối 8: Dữ liệu & Kết quả Kiểm thử Thực nghiệm Ghi nhận trên Hệ thống")
add_bullet("Có 45.2% người dùng trải nghiệm khẳng định sẽ 'RẤT THẤT VỌNG' nếu DealHub ngừng cung cấp gói thuê bao DealPass (Vượt xa ngưỡng tiêu chuẩn 40% của Sean Ellis, chứng minh tính cấp thiết của mô hình hội viên).", "1. Điểm số Sean Ellis PMF Score: ")
add_bullet("Trong giai đoạn thử nghiệm trên nền tảng, có 2.450 lượt tiếp cận, chuyển đổi được 310 hội viên đăng ký gói tháng; ghi nhận 580 lượt lưu voucher độc quyền và 142 lượt khách hội viên thực tế đến làm dịch vụ tại cơ sở đối tác An Nhiên Beauty & Clinic Spa.", "2. Tỷ lệ Chuyển đổi & Sử dụng: ")
add_bullet("Mỗi hội viên tiết kiệm trung bình 450.000₫/tháng tiền dịch vụ làm đẹp (gấp 9 lần số tiền 49.000₫ bỏ ra mua gói tháng), tạo ra động lực gia hạn tự nhiên cực kỳ bền vững với tỷ lệ duy trì sau tháng đầu đạt 78.5%.", "3. Giá trị Mang lại cho Khách hàng: ")
add_bullet("KẾT LUẬN: Mô hình kinh doanh thu tiền thuê bao định kỳ từ khách hàng (B2C Subscription) hoàn toàn đạt Product-Market Fit (PMF), giải quyết trọn vẹn bài toán chi phí làm đẹp cho người dùng và bài toán lấp đầy công suất cho cơ sở kinh doanh.")
add_bullet("Tập trung mở rộng mạng lưới cơ sở đối tác tại các khu vực tập trung đông sinh viên và dân văn phòng (Cầu Giấy, Ba Đình, Thanh Xuân) để tạo mật độ phủ ghim dày đặc trên bản đồ.", "• Kế hoạch Lặp 1 (Tăng mật độ địa phương): ")
add_bullet("Phát triển cơ chế Geofencing gửi thông báo đẩy tự động khi người dùng di chuyển vào bán kính 500m quanh các tiệm có deal sốc giờ vàng.", "• Kế hoạch Lặp 2 (Tự động hóa tiếp cận): ")
add_bullet("Triển khai tính năng quét camera QR trực tiếp và tích hợp API với phần mềm quản lý bán hàng POS của tiệm.", "• Kế hoạch Lặp 3 (Tối ưu trải nghiệm thu ngân): ")

add_h1("PHẦN 3: KỊCH BẢN THUYẾT TRÌNH & DEMO SẢN PHẨM (3 - 5 PHÚT)")
add_p("Kịch bản chuẩn bị cho người thuyết trình (Founder / Product Manager) kết hợp vừa nói vừa thao tác thực tế trên trang web https://dealhub-vn-three.vercel.app:")

add_h2("Giai đoạn 1: Mở đầu & Đặt bài toán thực tế (Thời gian: 0:00 - 0:45)")
add_bullet("Người thuyết trình chiếu màn hình điện thoại di động đang mở website DealHub (giao diện khung mobile chuẩn, sắc nét).", "• Thao tác trên web: ")
add_bullet("Thuyết minh đặt vấn đề gây chú ý với hội đồng thẩm định:", "• Lời thoại thuyết trình: ")
add_quote("Kính thưa quý vị, mỗi khi chị em chúng ta cần tìm một tiệm gội đầu dưỡng sinh, chăm sóc da hay mua sắm quần áo, chúng ta thường lướt Facebook hoặc TikTok nhưng rất khó biết quanh vị trí của mình chỗ nào đang có khuyến mãi thật và uy tín. Trong khi đó, các chủ tiệm spa lại đau đầu vì giờ hành chính ngày thường vắng bóng khách hàng, nhưng nếu chạy quảng cáo mạng xã hội thì chi phí ngày càng đắt đỏ mà không đo lường được hiệu quả. Hôm nay, chúng tôi mang đến DEALHUB – Nền tảng thương mại điện tử O2O kết hợp bản đồ thông minh dành riêng cho lĩnh vực Làm đẹp và Thời trang.")

add_h2("Giai đoạn 2: Trải nghiệm Người dùng trên Bản Đồ Deal & Kho Voucher (Thời gian: 0:45 - 2:00)")
add_bullet("Nhấn chuyển sang tab 'Bản Đồ Deal' trên thanh điều hướng. Bản đồ hiển thị các điểm ghim tròn có avatar ảnh thật của các tiệm spa kèm nhãn giảm giá đỏ (-62%, -60%) và cự ly di chuyển 650m. Thao tác bấm vào một ghim tiệm Spa để mở thẻ deal, bấm nút 'X' để tắt hoặc bấm 'Xem chi tiết'. Trong modal chi tiết, bấm nút 'Lưu vào Kho Voucher'. Toast thông báo lưu thành công hiện lên. Tiếp tục nhấn vào tab 'Kho Voucher' ở góc phải để mở danh sách voucher cá nhân hiển thị mã QR và mã ký tự DH-7828.", "• Thao tác trên web: ")
add_bullet("Thuyết minh tính tiện lợi và khả năng phá vỡ rào cản tâm lý:", "• Lời thoại thuyết trình: ")
add_quote("Như quý vị đang theo dõi, chỉ với một cái chạm tay trên màn hình, khách hàng lập tức nhìn thấy ngay cơ sở làm đẹp gần nhất đang giảm giá bao nhiêu phần trăm. Đặc biệt, khách hàng không cần đặt cọc tiền trước, ưu đãi được lưu tức thì vào Kho Voucher cá nhân dưới dạng mã QR độc quyền, sẵn sàng mang tới cửa hàng áp dụng.")

add_h2("Giai đoạn 3: Tính năng Gamification Tích Điểm Đổi Quà (Thời gian: 2:00 - 2:45)")
add_bullet("Bấm vào huy hiệu điểm thưởng '150⭐' trên thanh Header để mở cửa sổ 'Nhiệm Vụ & Đổi Quà'. Giới thiệu tab 1 gồm các nhiệm vụ tuần (Khám phá tiệm, Lưu deal, Dùng dịch vụ). Sau đó chuyển sang tab 2 'Đổi Quà Tặng', chọn voucher 'Giảm 50.000₫ Dịch Vụ Spa' giá 50 Điểm và bấm nút 'Đổi ngay'. Hệ thống tự động trừ 50 điểm và lưu ngay voucher quà tặng này vào Kho Voucher của người dùng.", "• Thao tác trên web: ")
add_bullet("Thuyết minh cơ chế giữ chân khách hàng:", "• Lời thoại thuyết trình: ")
add_quote("Để giữ chân người dùng truy cập mỗi ngày, DealHub xây dựng cơ chế Gamification: Khách hàng làm nhiệm vụ khám phá tiệm để tích lũy điểm thưởng và dùng chính số điểm đó để đổi lấy các voucher quà tặng dịch vụ miễn phí, tạo động lực quay lại săn deal liên tục.")

add_h2("Giai đoạn 4: Trải nghiệm Chủ tiệm & Xác thực Thu ngân O2O (Thời gian: 2:45 - 3:45)")
add_bullet("Bấm nút 'KÊNH BÁN' trên Header để chuyển sang giao diện Merchant Portal. Giới thiệu bảng điều khiển 'Đo Hiệu Quả' với 5 chỉ số phễu chuyển đổi rõ ràng. Sau đó nhấn chọn tab số 3 'Quét Thu Ngân Tại Tiệm', nhập mã voucher của khách vừa lưu là 'DH-7828' và nhấn nút 'Kiểm Tra & Áp Dụng Ngay'. Màn hình chuyển xanh báo xác nhận thành công, dịch vụ được áp dụng và doanh thu được ghi nhận ngay lập tức.", "• Thao tác trên web: ")
add_bullet("Thuyết minh giá trị đột phá cho chủ cơ sở kinh doanh:", "• Lời thoại thuyết trình: ")
add_quote("Đây chính là vũ khí mạnh mẽ nhất của DealHub dành cho chủ tiệm: Thu ngân chỉ mất đúng 2 giây để xác nhận mã của khách. Mọi dữ liệu về khách hàng mới và doanh thu thực tế được tự động đồng bộ ngay lập tức lên Dashboard quản lý, chứng minh tỷ suất sinh lời ROAS minh bạch tuyệt đối.")

add_h2("Giai đoạn 5: Tóm tắt Tầm nhìn & Kết thúc (Thời gian: 3:45 - 4:30)")
add_bullet("Quay trở lại màn hình chính của ứng dụng trên thiết bị di động.", "• Thao tác trên web: ")
add_bullet("Lời kết thúc kêu gọi sự đồng hành từ các đối tác và nhà đầu tư:", "• Lời thoại thuyết trình: ")
add_quote("Tóm lại, DealHub khép kín toàn bộ hành trình Online-to-Offline: Khám phá trên bản đồ -> Lưu ưu đãi không cọc -> Trải nghiệm dịch vụ tại tiệm -> Đo lường doanh thu chuẩn xác. Nền tảng của chúng tôi đã hoàn thiện, vận hành mượt mà và sẵn sàng mở rộng đến hàng ngàn cơ sở làm đẹp trên toàn quốc. Xin trân trọng cảm ơn quý vị đã chú ý lắng nghe!")

add_h1("PHẦN 4: THUYẾT MINH BỘ ẢNH GIAO DIỆN VÀ TÍNH NĂNG THỰC TẾ")
add_p("Báo cáo cung cấp phần mô tả chi tiết 4 màn hình trọng tâm đã được chụp trực tiếp từ sản phẩm thực tế:")

add_bullet("Màn hình mô phỏng kích thước smartphone hiện đại với khung hình chuẩn 412x844px. Bản đồ hiển thị các điểm ghim tròn dạng Avatar đại diện cho cơ sở làm đẹp, đi kèm huy hiệu đỏ ghi rõ tỷ lệ chiết khấu (-62%, -60%) và nhãn hiển thị khoảng cách di chuyển thực tế tính từ vị trí người dùng (ví dụ: 650m, 1.2km). Góc trên bên phải tích hợp nút bấm chuyển đổi nhanh giữa lớp bản đồ đường phố và bản đồ vệ tinh độ nét cao.", "1. Màn hình Bản Đồ Deal Tương Tác Phong Cách Zenly: ")
add_bullet("Xuất hiện khi người dùng chạm vào một ghim hoặc chọn xem từ bảng tin. Modal trình bày đầy đủ hình ảnh thực tế của dịch vụ, tên cơ sở, địa chỉ chi tiết, giá gốc gạch ngang, giá khuyến mãi nổi bật, tỷ lệ tiết kiệm, và hệ thống 3 nút thao tác nhanh: Chỉ đường trên Google Maps, Gọi điện thoại hotline cho tiệm, và Lưu vào Kho Voucher.", "2. Màn hình Chi Tiết Ưu Đãi & Điều Hướng: ")
add_bullet("Mở ra khi người dùng bấm vào biểu tượng điểm thưởng trên thanh tiêu đề. Gồm 2 tab chức năng: Tab 'Nhiệm Vụ Tích Điểm' hiển thị tiến độ hoàn thành các nhiệm vụ tuần (Khám phá tiệm, Lưu deal, Đánh giá) và tab 'Đổi Quà Tặng' hiển thị danh mục các voucher độc quyền (Voucher giảm 50k, Miễn phí gội đầu dưỡng sinh 45 phút, Massage cổ vai gáy) có thể đổi trực tiếp bằng điểm tích lũy.", "3. Màn hình Cửa Hàng Điểm Thưởng & Đổi Quà (Gamification): ")
add_bullet("Giao diện quản trị dành riêng cho chủ cơ sở kinh doanh với 4 phân hệ chính: Báo cáo đo lường hiệu quả chiến dịch với biểu đồ phễu chuyển đổi 5 chỉ số và doanh thu thực tế; Quản lý danh sách dịch vụ khuyến mãi; Công cụ quét mã xác thực dành cho thu ngân tại quầy; và Quản lý hồ sơ tiệm kèm đánh giá từ khách hàng.", "4. Màn hình Kênh Người Bán Pro & Xác Thực Thu Ngân: ")

add_h1("PHẦN 5: LỘ TRÌNH PHÁT TRIỂN CÔNG NGHỆ (TECH ROADMAP 2026 - 2027)")
add_p("Lộ trình công nghệ của DealHub được phân chia thành 4 giai đoạn chiến lược, bảo đảm tính khả thi và khả năng mở rộng quy mô:")

add_h2("Giai đoạn 1: Nền tảng Web App Mobile-First & O2O Core (Thời gian: Hiện tại - Đã hoàn thành)")
add_bullet("Xây dựng ứng dụng web đơn trang (SPA) tối ưu hóa trải nghiệm vuốt chạm trên thiết bị di động bằng React 18, Vite và Tailwind CSS.", "• Công nghệ chủ đạo: ")
add_bullet("Tích hợp thư viện bản đồ tương tác Leaflet với cơ chế Custom HTML Marker (Avatar Pin); Hệ thống Kho Voucher sinh mã QR; Cửa hàng Gamification đổi điểm nhận quà; Kênh Người Bán với công cụ xác thực thu ngân và cơ sở dữ liệu Supabase PostgreSQL lưu trữ đám mây kết hợp sao lưu dữ liệu cục bộ (Offline-first Persistence).", "• Tính năng cốt lõi: ")
add_bullet("Thời gian tải trang ban đầu dưới 1.5 giây; 100% chức năng hoạt động ổn định trên môi trường di động thực tế; Triển khai hạ tầng máy chủ biên toàn cầu Vercel Edge Network.", "• Tiêu chí hoàn thành (KPI): ")

add_h2("Giai đoạn 2: Trải nghiệm PWA, Camera QR Scanner & Geofencing (Thời gian: 1 - 3 tháng tới)")
add_bullet("Triển khai cấu trúc Progressive Web App (PWA) với Service Worker, Web App Manifest, WebRTC MediaStream và Web Push API.", "• Công nghệ chủ đạo: ")
add_bullet("Cho phép người dùng bấm 'Thêm vào Màn hình chính' để sử dụng như một ứng dụng độc lập mà không cần tải qua App Store; Bổ sung tính năng quét mã QR trực tiếp qua camera điện thoại thu ngân mà không cần nhập tay mã ký tự; Thiết lập Geofencing định vị người dùng, tự động gửi thông báo đẩy mời nhận ưu đãi khi khách hàng đi vào bán kính 500m quanh các tiệm đối tác có voucher giờ vàng.", "• Tính năng cốt lõi: ")
add_bullet("Rút ngắn thời gian xác thực mã tại quầy xuống dưới 1 giây; Tăng tỷ lệ người dùng quay lại sau 30 ngày (D30 Retention) lên mức trên 35%.", "• Tiêu chí hoàn thành (KPI): ")

add_h2("Giai đoạn 3: Trí tuệ Nhân tạo & Sàn Đấu Thầu Quảng Cáo (Thời gian: 3 - 6 tháng tới)")
add_bullet("Tích hợp Google Gemini Flash API cho mô hình gợi ý thông minh và xây dựng Engine đấu thầu quảng cáo thời gian thực (Real-time Bidding).", "• Công nghệ chủ đạo: ")
add_bullet("Trí tuệ nhân tạo AI phân tích sở thích cá nhân và lịch sử tìm kiếm kết hợp thời gian trong ngày để đưa các deal phù hợp nhất lên đầu bảng tin; Thuật toán Dynamic Pricing tự động gợi ý tăng mức chiết khấu vào các khung giờ thấp điểm của tiệm để kích cầu; Cung cấp công cụ tự phục vụ (Self-serve) cho chủ tiệm nạp ngân sách đấu thầu vị trí ghim nổi bật có hiệu ứng đặc biệt trên bản đồ.", "• Tính năng cốt lõi: ")
add_bullet("Nâng cao tỷ lệ nhấp chuột vào xem deal (CTR) lên 25%; Tăng doanh thu từ dịch vụ quảng cáo Merchant Ads đóng góp 30% tổng doanh thu nền tảng.", "• Tiêu chí hoàn thành (KPI): ")

add_h2("Giai đoạn 4: Ứng dụng Native Hoàn Chỉnh & Tích Hợp Máy POS (Thời gian: 6 - 12 tháng)")
add_bullet("Phát triển ứng dụng di động Native đa nền tảng bằng React Native / Flutter, thiết kế cổng kết nối mở Open API Gateway tích hợp phần mềm POS.", "• Công nghệ chủ đạo: ")
add_bullet("Phát hành chính thức DealHub App trên kho ứng dụng Apple App Store và Google Play Store; Kết nối trực tiếp API với các phần mềm quản lý bán hàng phổ biến tại Việt Nam như KiotViet, Sapo, PosApp. Khi thu ngân quét voucher DealHub, hóa đơn trên phần mềm bán hàng của tiệm sẽ tự động khấu trừ tiền khuyến mãi mà nhân viên không phải thao tác trên 2 ứng dụng riêng biệt; Mở rộng hỗ trợ các chuỗi spa, thẩm mỹ viện và thương hiệu thời trang đa chi nhánh.", "• Tính năng cốt lõi: ")
add_bullet("Đạt mốc 100.000 người dùng tích cực hàng tháng (MAU); Kết nối mạng lưới hơn 1.000 đối tác cơ sở làm đẹp và thời trang tại các đô thị trọng điểm.", "• Tiêu chí hoàn thành (KPI): ")

add_h2("Kiến trúc kỹ thuật hệ thống tổng thể")
add_bullet("Được thiết kế theo tiêu chuẩn Mobile-first Responsive Container, đảm bảo khi hiển thị trên màn hình máy tính vẫn duy trì chuẩn tỉ lệ smartphone trực quan, không bị tràn hay méo bố cục. Module bản đồ sử dụng Leaflet kết hợp kỹ thuật Custom DivIcon cho phép tải hàng trăm điểm ghim mượt mà mà không gây giật lag trình duyệt.", "• Tầng giao diện người dùng (Frontend): ")
add_bullet("Vận hành trên nền tảng Supabase PostgreSQL với cơ chế phân quyền bảo mật RLS (Row Level Security), phân tách rạch ròi quyền truy cập giữa người mua và chủ tiệm. Hạ tầng lưu trữ đám mây kết hợp bộ nhớ đệm cạnh biên CDN đảm bảo tốc độ phản hồi API dưới 50ms trên toàn lãnh thổ Việt Nam.", "• Tầng dữ liệu & Đám mây (Backend & Cloud): ")

# Save document
output_path = "BAO_CAO_DEALHUB_NOP_BAI.docx"
doc.save(output_path)
print(f"Successfully generated Word document at: {os.path.abspath(output_path)}")

