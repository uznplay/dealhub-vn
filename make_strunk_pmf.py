import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

doc = docx.Document()

# Margins
for section in doc.sections:
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(0.8)
    section.right_margin = Inches(0.8)

# Colors matching the image
C_PRIMARY = RGBColor(5, 150, 105) # Emerald
C_DARK = RGBColor(15, 23, 42)
C_GRAY = RGBColor(100, 116, 139)

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def add_title(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = C_PRIMARY
    p.paragraph_format.space_after = Pt(2)

def add_subtitle(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(11)
    run.font.italic = True
    run.font.color.rgb = C_GRAY
    p.paragraph_format.space_after = Pt(16)

def add_h1(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = C_PRIMARY
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)

def add_h2(text, color=C_DARK):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.color.rgb = color
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(3)

def add_p(text, bold_pre='', italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.2
    if bold_pre:
        r_pre = p.add_run(bold_pre)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(11)
        r_pre.font.bold = True
        r_pre.font.color.rgb = C_DARK
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(11)
    run.font.italic = italic

def add_bullet(text, bold_pre=''):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    if bold_pre:
        r_pre = p.add_run(bold_pre)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(11)
        r_pre.font.bold = True
        r_pre.font.color.rgb = C_DARK
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(11)

# Title
add_title('THE PMF CANVAS (PRODUCT-MARKET FIT CANVAS)')
add_subtitle('Mô hình kiểm thử 5 thành phần tuần tự (Christian Strunk Framework)\nDự án: DEALHUB – Nền Tảng Hội Viên Tiết Kiệm Phong Cách Sống | B2C Subscription')

add_p('\"Five components, validated in order. Skip one and the foundation cracks.\" (Năm thành phần kiểm thử theo thứ tự bắt buộc. Bỏ qua một bước, nền móng sẽ sụp đổ).')

# Summary Table (5 Columns)
table = doc.add_table(rows=5, cols=5)
table.alignment = WD_TABLE_ALIGNMENT.CENTER
headers = [
    '1. Customer Segment\n(Phân khúc khách hàng)',
    '2. Problem Validation\n(Xác thực vấn đề)',
    '3. Solution Fit\n(Độ phù hợp giải pháp)',
    '4. Channel Fit\n(Độ phù hợp kênh)',
    '5. Business Model Fit\n(Độ phù hợp mô hình)'
]
questions = [
    'Who specifically has the problem?\n(Ai cụ thể gặp vấn đề?)',
    'Is it painful enough to pay for?\n(Có đủ đau để sẵn sàng trả tiền?)',
    'Does your approach actually work?\n(Giải pháp có thực sự hiệu quả?)',
    'Can you reach customers economically?\n(Tiếp cận khách hàng chi phí rẻ?)',
    'Do the unit economics work?\n(Kinh tế đơn vị có sinh lời?)'
]
validated_whens = [
    'VALIDATED WHEN:\nYou can name 10 people and reach 50',
    'VALIDATED WHEN:\n20+ interviews, a top-three problem',
    'VALIDATED WHEN:\nUsers activate and come back',
    'VALIDATED WHEN:\nCAC below a third of lifetime value',
    'VALIDATED WHEN:\nLTV/CAC >= 3:1, payback under 12 months'
]
dealhub_apps = [
    'DealHub:\nGiới trẻ 18–30 (sinh viên, nhân viên văn phòng) hay đi ăn/chơi/mua sắm nhưng hầu bao có hạn.',
    'DealHub:\nNgại chi phí đắt đỏ, xót tiền; muốn đồ tốt dịch vụ xịn nhưng giá PHẢI RẺ. Sẵn sàng trả 49k/tháng để tiết kiệm hàng triệu.',
    'DealHub:\nGói DealPass 49k/tháng + Bản đồ GPS Zenly + QR voucher không cọc. Người dùng kích hoạt và dùng 3-5 voucher/tháng.',
    'DealHub:\nKênh truyền miệng, TikTok Reels, QR standee tại quán đối tác. CAC 35.000đ < 1/8 LTV (294.000đ).',
    'DealHub:\nLTV/CAC = 8.4 : 1, Payback < 1 tháng, Lãi gộp > 85% từ phí thuê bao hàng tháng.'
]
skip_consequences = [
    'SKIP IT AND YOU:\nBuild for the wrong people\n(Xây cho sai đối tượng)',
    'SKIP IT AND YOU:\nBuild something nobody needs\n(Xây thứ không ai cần)',
    'SKIP IT AND YOU:\nBuild something that doesn\'t work\n(Xây thứ không hoạt động)',
    'SKIP IT AND YOU:\nBuild something nobody finds\n(Xây thứ không ai tìm thấy)',
    'SKIP IT AND YOU:\nBuild something that can\'t sustain itself\n(Xây thứ không tự sống được)'
]

# Style Table Header
hdr_cells = table.rows[0].cells
for i, h in enumerate(headers):
    hdr_cells[i].text = h
    set_cell_background(hdr_cells[i], '0F172A')
    for p in hdr_cells[i].paragraphs:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(9.5)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)

# Row 1: Question
row1_cells = table.rows[1].cells
for i, q in enumerate(questions):
    row1_cells[i].text = q
    set_cell_background(row1_cells[i], 'F1F5F9')
    for p in row1_cells[i].paragraphs:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(9)
            r.font.bold = True

# Row 2: Validated When
row2_cells = table.rows[2].cells
for i, v in enumerate(validated_whens):
    row2_cells[i].text = v
    set_cell_background(row2_cells[i], 'FFFFFF')
    for p in row2_cells[i].paragraphs:
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(8.5)

# Row 3: DealHub Validation
row3_cells = table.rows[3].cells
for i, d in enumerate(dealhub_apps):
    row3_cells[i].text = d
    set_cell_background(row3_cells[i], 'ECFDF5') # Green tint
    for p in row3_cells[i].paragraphs:
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(8.5)
            r.font.color.rgb = RGBColor(4, 120, 87)

# Row 4: Skip it and you
row4_cells = table.rows[4].cells
for i, s in enumerate(skip_consequences):
    row4_cells[i].text = s
    set_cell_background(row4_cells[i], 'FEF2F2') # Red tint
    for p in row4_cells[i].paragraphs:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in p.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(8)
            r.font.bold = True
            r.font.color.rgb = RGBColor(185, 28, 28)

p_space = doc.add_paragraph()
p_space.paragraph_format.space_before = Pt(14)

# ================= CHI TIẾT 5 THÀNH PHẦN =================
add_h1('CHI TIẾT KIỂM THỬ 5 THÀNH PHẦN THEO KHUNG PMF CANVAS')

# Thành phần 1
add_h2('THÀNH PHẦN 1: CUSTOMER SEGMENT (PHÂN KHÚC KHÁCH HÀNG)')
add_p('Câu hỏi cốt lõi: Who specifically has the problem? (Ai cụ thể là người gặp vấn đề này?)', italic=True)
add_bullet('Người trẻ 18 – 30 tuổi (sinh viên các trường đại học, người mới đi làm, nhân viên văn phòng) tại các đô thị lớn.', '• Nhóm đối tượng cụ thể: ')
add_bullet('Có thói quen ra ngoài ăn uống, cafe tụ tập, vui chơi giải trí và mua sắm thường xuyên (2 – 4 lần/tuần). Họ rất thích trải nghiệm đồ tốt, quán đẹp nhưng luôn phải đắn đo nhìn bảng giá vì thu nhập/ngân sách hàng tháng có hạn.', '• Đặc điểm hành vi: ')
add_bullet('Nhóm dự án chỉ rõ được danh sách 10 người dùng mẫu cụ thể (bạn học, đồng nghiệp) và mở rộng tiếp cận thử nghiệm thực tế với 50+ người dùng tại Hà Nội.', '• VALIDATED WHEN (Được kiểm chứng khi): ')
add_bullet('Bỏ qua bước này, bạn sẽ \"Build for the wrong people\" (Xây dựng sản phẩm cho sai đối tượng).', '• SKIP IT AND YOU: ')

# Thành phần 2
add_h2('THÀNH PHẦN 2: PROBLEM VALIDATION (XÁC THỰC VẤN ĐỀ)')
add_p('Câu hỏi cốt lõi: Is it painful enough to pay for? (Vấn đề có đủ đau để khách hàng sẵn sàng trả tiền không?)', italic=True)
add_bullet('Khách hàng ngại chi phí đắt đỏ, xót tiền khi nhìn giá gốc; nhưng lại sợ \"của rẻ là của ôi\". Họ mong muốn được dùng đồ tốt, dịch vụ xịn nhưng giá PHẢI RẺ. Họ chán ngấy các mã giảm giá ảo trên mạng và sẵn sàng trả 49.000₫/tháng (bằng 1 ly trà sữa) để mua chiếc thẻ hội viên mở khóa quyền lợi tiết kiệm tiền triệu.', '• Nỗi đau cốt lõi: ')
add_bullet('Thực hiện phỏng vấn sâu 20+ người tiêu dùng trẻ: 100% khẳng định chi phí ăn chơi/mua sắm nằm trong TOP 3 áp lực tài chính hàng tháng. 85% người được phỏng vấn xác nhận sẵn sàng trả 49k/tháng nếu nền tảng giúp họ tiết kiệm trên 500k/tháng.', '• VALIDATED WHEN (Được kiểm chứng khi): ')
add_bullet('Bỏ qua bước này, bạn sẽ \"Build something nobody needs\" (Xây dựng thứ mà không ai thực sự cần).', '• SKIP IT AND YOU: ')

# Thành phần 3
add_h2('THÀNH PHẦN 3: SOLUTION FIT (ĐỘ PHÙ HỢP CỦA GIẢI PHÁP)')
add_p('Câu hỏi cốt lõi: Does your approach actually work? (Cách tiếp cận của bạn có thực sự hiệu quả không?)', italic=True)
add_bullet('Mô hình thẻ hội viên DealPass (49k/tháng) kết hợp Bản đồ GPS Zenly định vị các quán xịn giá rẻ gần nhất và ví voucher QR không cần cọc, quét tại quầy thu ngân trong 2 giây.', '• Giải pháp DealHub: ')
add_bullet('Người dùng kích hoạt gói tháng (Activate) và quay lại sử dụng đều đặn (Come back). Thực nghiệm trên hệ thống ghi nhận mỗi hội viên sử dụng 3 – 5 voucher/tháng và tỷ lệ gia hạn tháng tiếp theo đạt 81.2%. Điểm Sean Ellis Test đạt 46.5% người dùng trả lời \"Rất thất vọng\" nếu thiếu DealHub.', '• VALIDATED WHEN (Được kiểm chứng khi): ')
add_bullet('Bỏ qua bước này, bạn sẽ \"Build something that doesn\'t work\" (Xây dựng thứ không hoạt động được trong thực tế).', '• SKIP IT AND YOU: ')

# Thành phần 4
add_h2('THÀNH PHẦN 4: CHANNEL FIT (ĐỘ PHÙ HỢP CỦA KÊNH TIẾP CẬN)')
add_p('Câu hỏi cốt lõi: Can you reach customers economically? (Có tiếp cận khách hàng với chi phí rẻ không?)', italic=True)
add_bullet('Tận dụng kênh truyền miệng (Word-of-Mouth rủ bạn đi ăn deal hời), video ngắn TikTok/Reels review địa điểm xịn giá rẻ, và đặt standee mã QR tại quầy thanh toán của các quán đối tác (\"Đăng ký DealPass giảm ngay 50% cho bàn này\").', '• Kênh tiếp cận DealHub: ')
add_bullet('Chi phí thu hút một khách hàng trả phí (CAC) đạt 35.000 VNĐ, thấp hơn nhiều so với 1/3 Giá trị vòng đời khách hàng LTV (294.000 VNĐ cho gói 6 tháng). Tỷ lệ CAC/LTV đạt dưới 1/8.', '• VALIDATED WHEN (Được kiểm chứng khi): ')
add_bullet('Bỏ qua bước này, bạn sẽ \"Build something nobody finds\" (Xây dựng thứ mà không ai tìm thấy).', '• SKIP IT AND YOU: ')

# Thành phần 5
add_h2('THÀNH PHẦN 5: BUSINESS MODEL FIT (ĐỘ PHÙ HỢP MÔ HÌNH KINH DOANH)')
add_p('Câu hỏi cốt lõi: Do the unit economics work? (Kinh tế đơn vị có khả thi và sinh lời bền vững không?)', italic=True)
add_bullet('Mô hình B2C Subscription: Thu 49.000₫/tháng từ người dùng. Chi phí biến đổi trên mỗi thuê bao (máy chủ, vận hành) chỉ ~5.000₫/tháng, mang lại tỷ suất lợi nhuận gộp trên 85%. Tỷ lệ LTV / CAC đạt 8.4 : 1 (vượt xa mức chuẩn 3:1). Thời gian hoàn vốn CAC (Payback Period) dưới 1 tháng (ngay tháng đầu tiên khách trả 49k đã thu hồi đủ chi phí CAC 35k).', '• Kinh tế đơn vị DealHub: ')
add_bullet('Tỷ lệ LTV/CAC đạt 8.4 : 1 (chuẩn quốc tế >= 3:1) và thời gian thu hồi vốn đạt dưới 1 tháng (chuẩn quốc tế dưới 12 tháng).', '• VALIDATED WHEN (Được kiểm chứng khi): ')
add_bullet('Bỏ qua bước này, bạn sẽ \"Build something that can\'t sustain itself\" (Xây dựng mô hình không thể tự nuôi sống chính mình).', '• SKIP IT AND YOU: ')

# Save
output_filename = 'THE_PMF_CANVAS_DEALHUB_CHRISTIAN_STRUNK.docx'
doc.save(output_filename)
print(f'Successfully saved: {output_filename}')

