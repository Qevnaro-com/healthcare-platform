import os
import sys
import PIL.Image, PIL.ImageDraw
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

# Ensure background image exists
cleaned_bg_path = "cleaned_letterhead_bg.png"
if not os.path.exists(cleaned_bg_path):
    print("Error: cleaned_letterhead_bg.png not found!")
    sys.exit(1)

# Two-pass canvas for Page X of Y header string
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#334155"))
        self.drawRightString(540, 808, f"AGREEMENT NO: PNC-QEV-2026-02   |   PAGE {self._pageNumber} OF {page_count}")
        self.restoreState()

def draw_background(canvas_obj, doc_obj):
    canvas_obj.saveState()
    canvas_obj.drawImage(cleaned_bg_path, 0, 0, width=595.27, height=841.89)
    canvas_obj.restoreState()

def build_pdf(filename="Pulse_n_Care_Agreement.pdf"):
    # Page setup: A4 (595.27 x 841.89 pt)
    # Margins: Left=42, Right=42, Top=116, Bottom=70
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=42,
        rightMargin=42,
        topMargin=116,
        bottomMargin=70
    )

    styles = getSampleStyleSheet()
    
    # Executive Palette
    c_primary = colors.HexColor("#0F172A")       # Deep Slate 900
    c_secondary = colors.HexColor("#0284C7")     # Ocean Corporate Blue 600
    c_dark = colors.HexColor("#334155")          # Slate 700 Text
    c_light_bg = colors.HexColor("#F8FAFC")      # Light Gray Background
    c_border = colors.HexColor("#CBD5E1")        # Slate 300 Border
    c_green = colors.HexColor("#047857")         # Success Green
    c_green_bg = colors.HexColor("#ECFDF5")      # Success Soft Green Fills
    c_red = colors.HexColor("#B91C1C")           # Exclusion Red
    c_red_bg = colors.HexColor("#FEF2F2")        # Exclusion Soft Red Fills

    # Typography Styles
    doc_title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12.5,
        leading=16,
        textColor=colors.white,
        alignment=TA_CENTER,
        spaceAfter=2
    )

    doc_subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#BAE6FD"),
        alignment=TA_CENTER,
        spaceAfter=0
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.6,
        textColor=c_dark,
        spaceAfter=3,
        alignment=TA_LEFT
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=10,
        bulletIndent=3,
        spaceAfter=1.8
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.8,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.8,
        textColor=c_primary
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=10.2,
        textColor=colors.white
    )

    story = []

    # Title Banner Block (Executive Dark Navy Card)
    banner_content = [
        [Paragraph("SOFTWARE DEVELOPMENT & WEBSITE SERVICES AGREEMENT", doc_title_style)],
        [Paragraph("PROJECT: PULSE N CARE — PUBLIC HEALTHCARE SHOWCASE & SERVICES WEBSITE", doc_subtitle_style)]
    ]
    banner_table = Table(banner_content, colWidths=[511])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('TOPPADDING', (0,0), (-1,0), 5),
        ('BOTTOMPADDING', (0,0), (-1,0), 2),
        ('TOPPADDING', (0,1), (-1,1), 2),
        ('BOTTOMPADDING', (0,1), (-1,1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 3))

    # Meta Table (Agreement Details Grid Box)
    meta_data = [
        [
            Paragraph("<b>Service Provider:</b> Qevnaro Technology Center", table_cell_style),
            Paragraph("<b>Total Project Deal:</b> Rs. 13,000 INR (Fixed)", table_cell_bold)
        ],
        [
            Paragraph("<b>Client / Brand:</b> Pulse n Care", table_cell_style),
            Paragraph("<b>Advance Paid:</b> Rs. 5,000 INR (Received / Adjusted)", table_cell_bold)
        ],
        [
            Paragraph("<b>Agreement Date:</b> October 25, 2026", table_cell_style),
            Paragraph("<b>Remaining Balance:</b> Rs. 8,000 INR (Payable on Handover)", table_cell_bold)
        ],
        [
            Paragraph("<b>Agreement Ref No:</b> PNC-QEV-2026-02", table_cell_style),
            Paragraph("<b>Deliverable Type:</b> Git Repository Source Code", table_cell_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 261])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_light_bg),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 3))

    # Helper function to create section heading bar
    def create_section_header(title_text):
        header_p = Paragraph(f"<b>{title_text}</b>", ParagraphStyle(
            'SecHead',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.2,
            leading=10.5,
            textColor=c_primary
        ))
        t = Table([[header_p]], colWidths=[511])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
            ('LINELEFT', (0,0), (0,0), 3, c_secondary),
            ('TOPPADDING', (0,0), (-1,-1), 2.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ]))
        return t

    # Executive Preamble
    p_intro = ("This Software Development & Website Services Agreement (“Agreement”) is executed between "
               "<b>Qevnaro Technology Center</b> (“Service Provider”) and <b>Pulse n Care</b> (“Client”). "
               "This document supersedes any previous proposals and defines the mutually agreed commercial scope, "
               "technical boundaries, and deliverable specifications for the development of a professional, modern "
               "public marketing and healthcare service showcase website.")
    story.append(Paragraph(p_intro, body_style))
    story.append(Spacer(1, 2))

    # Section 1: PARTIES
    story.append(create_section_header("1. PARTIES & CONTRACTUAL IDENTIFICATION"))
    story.append(Spacer(1, 2))
    parties_data = [
        [
            Paragraph("<b>SERVICE PROVIDER</b>", table_header_style),
            Paragraph("<b>CLIENT / BRAND</b>", table_header_style)
        ],
        [
            Paragraph("<b>Company Name:</b> Qevnaro Technology Center<br/>"
                      "<b>Representative:</b> Authorized Director<br/>"
                      "<b>Corporate Email:</b> qevnaro@gmail.com", table_cell_style),
            Paragraph("<b>Brand / Company:</b> Pulse n Care<br/>"
                      "<b>Representative:</b> Authorized Signatory<br/>"
                      "<b>Corporate Email:</b> contact@pulserncare.com", table_cell_style)
        ]
    ]
    parties_table = Table(parties_data, colWidths=[250, 261])
    parties_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(parties_table)
    story.append(Spacer(1, 3))

    # Section 2: AGREED PROJECT SCOPE & PUBLIC DELIVERABLES
    story.append(create_section_header("2. AGREED PROJECT SCOPE — PUBLIC WEBSITE & SERVICES SHOWCASE"))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "Qevnaro will design, engineer, and package a high-conversion, responsive public website for <b>Pulse n Care</b>. "
        "The scope is strictly centered on presenting the client's home healthcare services and directing customer inquiries efficiently:", body_style))
    scope_items = [
        "<b>High-Impact Public Website:</b> Modern, clean, and patient-friendly healthcare design engineered for brand credibility.",
        "<b>Comprehensive Healthcare Services Presentation:</b> Clear display of all Pulse n Care home care solutions (e.g., Doorstep Nursing Care, Elderly Patient Assistance, Post-Operative Care, Palliative Attendants, and Clinical Home Visits).",
        "<b>Service Detail Sections:</b> Clear descriptions, clinical highlights, caregiver standards, and benefits for each featured care service.",
        "<b>Direct WhatsApp Call-To-Action (Click-to-Chat):</b> Prominent, interactive WhatsApp contact button (floating CTA and dedicated page action). When a visiting patient or family member clicks this button, it automatically launches WhatsApp with a pre-configured greeting to message Pulse n Care directly.",
        "<b>Core Brand Pages / Sections:</b> Essential public sections including About Pulse n Care, Mission & Care Protocols, Healthcare Services Directory, Patient FAQ, and Direct Contact Information.",
        "<b>Mobile & Multi-Device Responsiveness:</b> Fluidly responsive layout tested and optimized across smartphones, tablets, laptops, and desktop browsers.",
        "<b>Final Deliverable:</b> Clean, structured frontend source code delivered via a secure Git repository (GitHub)."
    ]
    for item in scope_items:
        story.append(Paragraph(f"• {item}", bullet_style))

    # Section 3: EXPLICIT EXCLUSION OF PANELS & PORTALS (ZERO DASHBOARD)
    story.append(Spacer(1, 2))
    story.append(create_section_header("3. EXPLICIT EXCLUSION OF PANELS, DASHBOARDS & USER PORTALS"))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<b>Strict Zero-Portal Architecture:</b> As specifically agreed in this revised Rs. 13,000 package, "
        "this project does <u>NOT</u> include any authenticated panels, login modules, or internal management portals. "
        "The following modules are expressly excluded from the scope of work:", body_style))
    panel_exclusions = [
        "<b>NO Admin Dashboard / Operations Command Center:</b> No internal administrative portal for employee management, order dispatch, or dynamic settings.",
        "<b>NO Staff / Field Nurse Duty Panel:</b> No dedicated employee interface, attendance roster, check-in logger, or nurse duty assignment panel.",
        "<b>NO B2B / Institutional Organization Panel:</b> No hospital/clinic client portal, multi-branch facility management, or bulk requisition panel.",
        "<b>NO Client / Patient Login Dashboard:</b> No customer account creation, password login, patient history database, or self-service dashboard.",
        "<b>Operational Flow Clarification:</b> All incoming leads and patient requests bypass login systems and connect directly to Pulse n Care via direct WhatsApp chat."
    ]
    for pe in panel_exclusions:
        story.append(Paragraph(f"• {pe}", bullet_style))

    # Clean Page Break -> PAGE 2
    story.append(PageBreak())

    # Section 4: HOSTING, DOMAIN & DATABASE EXCLUSIONS
    story.append(create_section_header("4. DATABASE, HOSTING & DEPLOYMENT BOUNDARIES (ZERO RESPONSIBILITY)"))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "To establish absolute clarity and prevent post-delivery operational disputes, the following infrastructure boundaries are agreed:", body_style))
    infra_points = [
        "<b>NO Database Responsibility:</b> The platform is built as a lightweight, lightning-fast static frontend web application. Qevnaro is not responsible for creating, hosting, configuring, or maintaining any SQL/NoSQL databases or database servers.",
        "<b>NO Domain Purchase or Management:</b> Client is solely responsible for purchasing, renewing, and owning their custom domain name (e.g., www.pulserncare.com) and configuring DNS records.",
        "<b>NO Live Hosting or Cloud Server Setup:</b> Qevnaro bears zero responsibility for providing, purchasing, configuring, or paying for web servers, cloud hosting providers (e.g., AWS, Hostinger, Vercel, Netlify), or SSL certificates.",
        "<b>NO Ongoing Server Deployment Management:</b> The deployment, server uptime, DNS pointing, and live hosting environment are entirely the Client's domain and responsibility.",
        "<b>Git Repository Handover:</b> Qevnaro's technical delivery obligation is fully satisfied upon delivering the complete, production-ready frontend project code via Git Repository (GitHub repo transfer or repository access)."
    ]
    for ip in infra_points:
        story.append(Paragraph(f"• {ip}", bullet_style))

    # Section 5: COMMERCIAL VALUE & PAYMENT STRUCTURE
    story.append(Spacer(1, 3))
    story.append(create_section_header("5. COMMERCIAL DEAL VALUE & PAYMENT MILESTONES"))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "The total revised commercial deal value for the complete public website deliverables described herein is "
        "<b>Rs. 13,000 INR</b> (Thirteen Thousand Indian Rupees). The payment structure and current execution status are as follows:", body_style))
    
    pay_table_data = [
        [
            Paragraph("<b>Payment Stage / Milestone</b>", table_header_style),
            Paragraph("<b>Deliverable / Condition</b>", table_header_style),
            Paragraph("<b>Amount (Rs.)</b>", table_header_style),
            Paragraph("<b>Payment Status</b>", table_header_style)
        ],
        [
            Paragraph("<b>1. Commencement Deposit</b><br/>Project initiation & scope freeze", table_cell_style),
            Paragraph("Initial advance payment", table_cell_style),
            Paragraph("<b>Rs. 5,000 INR</b>", table_cell_style),
            Paragraph("<font color='#047857'><b>RECEIVED / PAID</b></font>", table_cell_style)
        ],
        [
            Paragraph("<b>2. Final Project Handover</b><br/>Delivery of source code via Git Repo", table_cell_style),
            Paragraph("Full codebase completion & Git repo access", table_cell_style),
            Paragraph("<b>Rs. 8,000 INR</b>", table_cell_style),
            Paragraph("<font color='#B91C1C'><b>PENDING BALANCE</b></font>", table_cell_style)
        ],
        [
            Paragraph("<b>TOTAL COMMERCIAL VALUE</b>", table_header_style),
            Paragraph("<b>Complete Public Website Package</b>", table_header_style),
            Paragraph("<b>Rs. 13,000 INR</b>", table_header_style),
            Paragraph("<b>Rs. 8,000 Remaining</b>", table_header_style)
        ]
    ]
    pay_table = Table(pay_table_data, colWidths=[150, 151, 105, 105])
    pay_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BACKGROUND', (0,-1), (-1,-1), c_secondary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('BACKGROUND', (0,1), (-1,1), c_green_bg),
        ('BACKGROUND', (0,2), (-1,2), c_red_bg),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(pay_table)
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<i>* Note on Handover: Full Git repository access and codebase handover will be executed immediately upon receipt and confirmation of the remaining Rs. 8,000 balance.</i>",
        ParagraphStyle('Note', parent=body_style, fontSize=7.2, fontName='Helvetica-Oblique', textColor=colors.HexColor("#64748B"))
    ))

    # Section 6: POST-DELIVERY MAINTENANCE & SUPPORT (EXACTLY 1 FREE SERVICE)
    story.append(Spacer(1, 3))
    story.append(create_section_header("6. POST-DELIVERY SUPPORT POLICY — EXACTLY ONE (1) FREE BASIC FIX"))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "Following completion of the website and handover of the Git repository, Qevnaro includes <b>exactly one (1) single complimentary basic maintenance service</b>:", body_style))
    support_points = [
        "<b>Scope of Single Free Service:</b> The one free service covers minor corrective adjustments such as fixing a minor text typo, updating a WhatsApp contact phone number, or adjusting minor element alignment.",
        "<b>Single Iteration Window:</b> This free service must be consolidated into a single consolidated request by Pulse n Care.",
        "<b>Exclusion of Major Work:</b> The complimentary service does <u>not</u> cover adding new pages, building new feature sections, redesigning the website, or resolving third-party hosting/domain errors.",
        "<b>Additional Maintenance:</b> Any further revisions, technical troubleshooting, or modifications requested after the exhaustion of this single free service will be billed separately under a new paid quote."
    ]
    for sp in support_points:
        story.append(Paragraph(f"• {sp}", bullet_style))

    # Clean Page Break -> PAGE 3
    story.append(PageBreak())

    # Section 7: COMMERCIAL SCOPE MATRIX TABLE
    story.append(create_section_header("7. COMMERCIAL INCLUSIONS & EXCLUSIONS MATRIX"))
    story.append(Spacer(1, 2))
    matrix_data = [
        [Paragraph("<b>Scope Deliverable / Item</b>", table_header_style), Paragraph("<b>Contract Status (Rs. 13,000 Deal)</b>", table_header_style)],
        [Paragraph("Modern Responsive Public Healthcare Website", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b></font>", table_cell_style)],
        [Paragraph("Detailed Healthcare Services & Caregiver Showcase", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b></font>", table_cell_style)],
        [Paragraph("Direct WhatsApp Click-to-Chat Contact CTA Integration", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b></font>", table_cell_style)],
        [Paragraph("Source Code Delivery via Git Repository (GitHub)", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b> (After final payment)</font>", table_cell_style)],
        [Paragraph("Post-Delivery Support: Exactly One (1) Basic Fix Service", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b> (One-time basic adjustment)</font>", table_cell_style)],
        [Paragraph("Admin / Operations Management Dashboard", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (No Panel)</font>", table_cell_style)],
        [Paragraph("Staff / Nurse Duty Attendance & Shift Panel", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (No Panel)</font>", table_cell_style)],
        [Paragraph("B2B / Hospital Institutional Management Panel", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (No Panel)</font>", table_cell_style)],
        [Paragraph("Client / Patient Authentication & Login Portal", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (No Panel)</font>", table_cell_style)],
        [Paragraph("Backend Database Creation, Management & Hosting", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (No Database)</font>", table_cell_style)],
        [Paragraph("Domain Name Purchase, DNS Setup & Live Hosting Server", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (Client's Responsibility)</font>", table_cell_style)],
        [Paragraph("Third-Party API / Meta WhatsApp Messaging Fees", table_cell_style), Paragraph("<font color='#B91C1C'><b>STRICTLY EXCLUDED</b> (Client's Responsibility)</font>", table_cell_style)]
    ]
    matrix_table = Table(matrix_data, colWidths=[310, 201])
    matrix_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('BACKGROUND', (0,1), (-1,1), c_green_bg),
        ('BACKGROUND', (0,2), (-1,2), c_green_bg),
        ('BACKGROUND', (0,3), (-1,3), c_green_bg),
        ('BACKGROUND', (0,4), (-1,4), c_green_bg),
        ('BACKGROUND', (0,5), (-1,5), c_green_bg),
        ('BACKGROUND', (0,6), (-1,6), c_red_bg),
        ('BACKGROUND', (0,7), (-1,7), c_red_bg),
        ('BACKGROUND', (0,8), (-1,8), c_red_bg),
        ('BACKGROUND', (0,9), (-1,9), c_red_bg),
        ('BACKGROUND', (0,10), (-1,10), c_red_bg),
        ('BACKGROUND', (0,11), (-1,11), c_red_bg),
        ('BACKGROUND', (0,12), (-1,12), c_red_bg),
        ('TOPPADDING', (0,0), (-1,-1), 2.2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.2),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(matrix_table)
    story.append(Spacer(1, 3))

    # Section 8: INTELLECTUAL PROPERTY & LEGAL PROVISIONS
    story.append(create_section_header("8. INTELLECTUAL PROPERTY, DATA & LEGAL PROVISIONS"))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<b>Code Ownership & Transfer:</b> Full ownership and rights to the bespoke frontend code created for Pulse n Care "
        "will be formally transferred to the Client immediately upon full clearance of the remaining Rs. 8,000 balance payment. "
        "Qevnaro retains ownership of underlying general-purpose utility libraries, standard boilerplates, and developer tooling.", body_style))
    story.append(Paragraph(
        "<b>Client Content & Medical Liability:</b> Pulse n Care is solely and fully responsible for all clinical information, "
        "medical claims, service descriptions, imagery, logos, nurse vetting standards, legal compliance, and patient disclaimers. "
        "Qevnaro acts strictly as a web technology contractor and bears zero liability for patient care or medical interactions.", body_style))
    story.append(Paragraph(
        "<b>Scope Governance:</b> Any feature addition, backend integration, or structural redesign outside this document "
        "will require a separate written agreement and additional milestone budget.", body_style))
    story.append(Spacer(1, 4))

    # Section 9: SIGNATURE BLOCK
    story.append(create_section_header("9. ACCEPTANCE & FORMAL EXECUTION SIGNATURES"))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "By signing below, both Qevnaro Technology Center and Pulse n Care formally agree to and execute this Agreement. "
        "Both parties confirm that the project scope is limited to a public showcase website with direct WhatsApp contact, "
        "total commercial deal of Rs. 13,000 (Rs. 5,000 paid advance, Rs. 8,000 remaining balance), zero panel/dashboard inclusion, "
        "zero database/hosting responsibility, deliverable handover via Git repository, and exactly one (1) free basic fix post-delivery.", body_style))
    story.append(Spacer(1, 4))

    sig_data = [
        [
            Paragraph("<b>FOR SERVICE PROVIDER: QEVNARO</b>", table_header_style),
            Paragraph("<b>FOR CLIENT: PULSE N CARE</b>", table_header_style)
        ],
        [
            Paragraph("<br/>"
                      "____________________________________<br/>"
                      "<b>Authorized Signature</b><br/><br/>"
                      "<b>Name:</b> ___________________________<br/><br/>"
                      "<b>Designation:</b> Founder / Director<br/><br/>"
                      "<b>Date:</b> ____ / ____ / 2026<br/>", table_cell_style),
            Paragraph("<br/>"
                      "____________________________________<br/>"
                      "<b>Authorized Signature</b><br/><br/>"
                      "<b>Name:</b> ___________________________<br/><br/>"
                      "<b>Designation:</b> Authorized Signatory<br/><br/>"
                      "<b>Date:</b> ____ / ____ / 2026<br/>", table_cell_style)
        ]
    ]
    sig_table = Table(sig_data, colWidths=[250, 261])
    sig_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    
    story.append(KeepTogether(sig_table))

    # Build Document
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background, canvasmaker=NumberedCanvas)
    print(f"PDF built successfully: {filename}")

if __name__ == '__main__':
    build_pdf()
