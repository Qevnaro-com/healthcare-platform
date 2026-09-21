import os
import sys
import PIL.Image, PIL.ImageDraw
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import pymupdf

# Step 1: Prepare Cleaned Letterhead Background Image (High Res 300 DPI)
letterhead_template_path = r"C:\Users\xshan\Downloads\Yellow and Dark Green Corporate Letterhead.pdf"
doc_template = pymupdf.open(letterhead_template_path)
page_template = doc_template[0]
pix = page_template.get_pixmap(dpi=300)
img = PIL.Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

# Mask out www.qevnaro.in (x: 200 to 850, y: 3150 to 3300 in 300dpi px)
draw = PIL.ImageDraw.Draw(img)
draw.rectangle([200, 3150, 850, 3300], fill=(255, 255, 255))

cleaned_bg_path = "cleaned_letterhead_bg.png"
img.save(cleaned_bg_path)
print("Cleaned background image saved successfully.")

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
        self.drawRightString(540, 808, f"AGREEMENT NO: PNC-QEV-2026-01   |   PAGE {self._pageNumber} OF {page_count}")
        self.restoreState()

def draw_background(canvas_obj, doc_obj):
    # Runs BEFORE Platypus draws story text on the page!
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
    
    # Executive Color Palette
    c_primary = colors.HexColor("#0F172A")       # Deep Slate 900
    c_secondary = colors.HexColor("#0284C7")     # Ocean Corporate Blue 600
    c_dark = colors.HexColor("#334155")          # Slate 700 Text
    c_light_bg = colors.HexColor("#F8FAFC")      # Light Gray Background
    c_border = colors.HexColor("#CBD5E1")        # Slate 300 Border
    c_accent_bar = colors.HexColor("#0284C7")    # Accent Line
    c_green = colors.HexColor("#047857")         # Success Green
    c_green_bg = colors.HexColor("#ECFDF5")      # Success Soft Green Fills
    c_red = colors.HexColor("#B91C1C")           # Exclusion Red
    c_red_bg = colors.HexColor("#FEF2F2")        # Exclusion Soft Red Fills

    # Typography Styles
    doc_title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=17,
        textColor=colors.white,
        alignment=TA_CENTER,
        spaceAfter=2
    )

    doc_subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#BAE6FD"), # Soft Sky Blue
        alignment=TA_CENTER,
        spaceAfter=0
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=12.5,
        textColor=c_primary,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.8,
        textColor=c_dark,
        spaceAfter=3,
        alignment=TA_LEFT
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=10,
        bulletIndent=3,
        spaceAfter=1.5
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=c_primary
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.white
    )

    story = []

    # Title Banner Block (Executive Dark Navy Card)
    banner_content = [
        [Paragraph("SOFTWARE DEVELOPMENT & WEBSITE SERVICES AGREEMENT", doc_title_style)],
        [Paragraph("PROJECT: PULSE N CARE — HOME HEALTHCARE & NURSE CARE AT DOORSTEP PLATFORM", doc_subtitle_style)]
    ]
    banner_table = Table(banner_content, colWidths=[511])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BOTTOMPADDING', (0,0), (-1,0), 2),
        ('TOPPADDING', (0,1), (-1,1), 2),
        ('BOTTOMPADDING', (0,1), (-1,1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 4))

    # Meta Table (Agreement Details Grid Box)
    meta_data = [
        [
            Paragraph("<b>Service Provider:</b> Qevnaro Technology Center", table_cell_style),
            Paragraph("<b>Total Project Investment:</b> Rs. 75,000 INR", table_cell_bold)
        ],
        [
            Paragraph("<b>Client / Brand:</b> Pulse n Care", table_cell_style),
            Paragraph("<b>Commencement Deposit:</b> Rs. 10,000 INR (Adjusted)", table_cell_style)
        ],
        [
            Paragraph("<b>Agreement Date:</b> September 21, 2026", table_cell_style),
            Paragraph("<b>Agreement Ref No:</b> PNC-QEV-2026-01", table_cell_bold)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 261])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_light_bg),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 4))

    # Helper function to create stylish section heading bar
    def create_section_header(title_text):
        header_p = Paragraph(f"<b>{title_text}</b>", ParagraphStyle(
            'SecHead',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=11,
            textColor=c_primary
        ))
        t = Table([[header_p]], colWidths=[511])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")), # Slate 100 Fills
            ('LINELEFT', (0,0), (0,0), 3, c_secondary),                 # Blue Left Accent Bar
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('LEFTPADDING', (0,0), (-1,-1), 7),
            ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ]))
        return t

    # Preamble / Introduction Paragraph
    p_intro = ("This Software Development & Website Services Agreement (“Agreement”) is executed between "
               "<b>Qevnaro</b> (“Service Provider”) and <b>Pulse n Care</b> (“Client”). Both parties agree to the complete scope of work, "
               "commercial terms, technical architecture, project deliverables, and operational responsibilities detailed herein.")
    story.append(Paragraph(p_intro, body_style))
    story.append(Spacer(1, 2))

    # Section 1: PARTIES
    story.append(create_section_header("1. PARTIES & CONTRACTUAL IDENTIFICATION"))
    story.append(Spacer(1, 3))
    parties_data = [
        [
            Paragraph("<b>SERVICE PROVIDER</b>", table_header_style),
            Paragraph("<b>CLIENT / BRAND</b>", table_header_style)
        ],
        [
            Paragraph("<b>Company Name:</b> Qevnaro Technology Center<br/>"
                      "<b>Representative:</b> Authorized Director<br/>"
                      "<b>Email:</b> qevnaro@gmail.com<br/>"
                      "<b>Phone:</b> +91 87965 30323<br/>"
                      "<b>Address:</b> Qevnaro Technology HQ", table_cell_style),
            Paragraph("<b>Brand / Company:</b> Pulse n Care<br/>"
                      "<b>Representative:</b> Authorized Signatory<br/>"
                      "<b>Email:</b> contact@pulserncare.com<br/>"
                      "<b>Phone:</b> Client Contact Line<br/>"
                      "<b>Address:</b> Pulse n Care Corporate Office", table_cell_style)
        ]
    ]
    parties_table = Table(parties_data, colWidths=[250, 261])
    parties_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(parties_table)
    story.append(Spacer(1, 4))

    # Section 2: PROJECT OBJECTIVE
    story.append(create_section_header("2. PROJECT OBJECTIVE & OPERATIONAL SCOPE"))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "Qevnaro will engineer, design, and deploy a professional website and operational software platform for <b>Pulse n Care</b>. "
        "The platform powers Pulse n Care's doorstep health care business model, dispatching verified nurses and skilled caregivers directly to patients' homes.<br/>"
        "The software delivers four primary operational experiences:", body_style))
    story.append(Paragraph("• <b>Client Panel:</b> Consumer care requests, doorstep booking management, tracking, and payment receipts.", bullet_style))
    story.append(Paragraph("• <b>Staff / Employee Duty Panel:</b> Nurse & caregiver duty schedules, shift tracking, and patient assignments.", bullet_style))
    story.append(Paragraph("• <b>B2B / Organization Panel:</b> Dedicated portal for institutional clients (hospitals, clinics, corporate care) to request bulk staffing.", bullet_style))
    story.append(Paragraph("• <b>Admin / Operations Command Center:</b> Dynamic service configuration, staff matching, billing, and analytics.", bullet_style))

    # Section 3: PROJECT SCOPE
    story.append(Spacer(1, 2))
    story.append(create_section_header("3. CORE DELIVERABLES & TECHNICAL SCOPE"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Qevnaro will execute design, engineering, database setup, testing, and deployment assistance for:", body_style))
    scope_items = [
        "Professional responsive public website with modern UI design & clear conversion funnels",
        "Client-facing care request system with dynamic multi-step doorstep care booking",
        "Client Workspace: Profile management, saved patient profiles & address management",
        "Staff Duty Workspace: Assignment feeds, shift details, duty check-in/completion tracking",
        "B2B Institutional Portal: Facility management, shift staffing requests & roster views",
        "Admin Command Center: Service builder, staff database, client records & duty operations",
        "Dynamic Service & Form Management (admin-configurable services, questions & fields)",
        "Automated Invoicing module and payment record status tracking system",
        "Role-Based Access Control (RBAC) ensuring strict data security across user panels",
        "Full mobile, tablet, and desktop responsive layout optimization",
        "Deployment support and server configuration for production environment"
    ]
    for item in scope_items:
        story.append(Paragraph(f"• {item}", bullet_style))

    # Section 4: PUBLIC WEBSITE
    story.append(Spacer(1, 2))
    story.append(create_section_header("4. PUBLIC WEBSITE ARCHITECTURE"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("The public website incorporates the following structured sections:", body_style))
    website_pages = [
        "<b>Home Page:</b> High-impact banner, core services overview, trust metrics, quick booking entry",
        "<b>About Us:</b> Company vision, nursing standards, clinical quality framework",
        "<b>Service Catalog:</b> Detailed overview of doorstep nursing and caregiving services",
        "<b>Individual Service Pages:</b> Dedicated landing pages for each core nursing category",
        "<b>How It Works:</b> Visual guide detailing doorstep care request and nurse arrival process",
        "<b>Client & Family Guide:</b> Patient safety protocols, caregiver vetting process, FAQs",
        "<b>B2B & Institutional Care:</b> Custom solutions for hospitals, clinics, and eldercare facilities",
        "<b>Careers & Nurse Joining:</b> Recruitment portal for qualified nurses and nursing assistants",
        "<b>Contact & Support:</b> Multi-channel inquiry form, helpline info, and location details",
        "<b>Portal Access Points:</b> Login & signup entry points for Clients, Staff, and B2B clients"
    ]
    for page in website_pages:
        story.append(Paragraph(f"• {page}", bullet_style))

    # Section 5: CLIENT PANEL
    story.append(Spacer(1, 2))
    story.append(create_section_header("5. CLIENT PANEL SPECIFICATIONS"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Enables customers and family members to manage doorstep care seamlessly:", body_style))
    client_features = [
        "Secure account registration, authentication, and profile management",
        "Patient Directory: Save family member medical profiles, care notes, and mobility status",
        "Address Book: Manage multiple care delivery locations with map/address tagging",
        "Care Request System: Select service type, duration (12-hour / 24-hour / shifts), and specific care needs",
        "Real-Time Duty Tracking: Follow status from <i>Request Submitted → Nurse Assigned → On Duty → Completed</i>",
        "Caregiver Profile View: View assigned nurse credentials, qualifications, and duty schedule",
        "Invoices & Receipts: View, download, and track payment receipts and billing summaries",
        "Support & Communication: In-app messaging/support entry point for duty adjustments"
    ]
    for feat in client_features:
        story.append(Paragraph(f"• {feat}", bullet_style))

    # Section 6: STAFF / EMPLOYEE PANEL
    story.append(Spacer(1, 2))
    story.append(create_section_header("6. STAFF / EMPLOYEE DUTY PANEL"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Empowers field nurses and caregivers to manage assigned doorstep duties:", body_style))
    staff_features = [
        "Secure staff authentication and employee profile dashboard",
        "Duty Feed: Overview of assigned upcoming, active, and completed duty shifts",
        "Patient Care Instructions: Access authorized patient requirements, emergency contacts, and location",
        "Duty Lifecycle Management: Acknowledge duty, record arrival at doorstep, mark completion",
        "Timesheet & Attendance Logs: Automatically log completed shift hours and duty records",
        "Privacy & Segregation: Staff access is strictly restricted to their active assigned patient tasks"
    ]
    for feat in staff_features:
        story.append(Paragraph(f"• {feat}", bullet_style))

    # Section 7: B2B / ORGANIZATION PANEL
    story.append(Spacer(1, 2))
    story.append(create_section_header("7. B2B / ORGANIZATION PANEL"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Designed for hospitals, nursing homes, eldercare institutions, and corporate clients:", body_style))
    b2b_features = [
        "Organization profile and multi-facility management",
        "Bulk Staffing Requests: Request multiple nurses/caregivers by role, shift, and facility location",
        "Workforce Roster View: Live overview of assigned staff across facility locations",
        "Timesheets & Billing Summaries: Consolidated shift records and monthly invoicing",
        "<i>Platform Clarification:</i> Managed B2B operational workspace — not an open gig-economy marketplace."
    ]
    for feat in b2b_features:
        story.append(Paragraph(f"• {feat}", bullet_style))

    # Section 8: ADMIN COMMAND PANEL
    story.append(Spacer(1, 2))
    story.append(create_section_header("8. ADMIN & OPERATIONS COMMAND PANEL"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Central operational hub providing complete management control:", body_style))
    admin_subsections = [
        "<b>Service Management Engine:</b> Add, edit, activate/deactivate services, categories, and custom booking questions dynamically without hard-coding.",
        "<b>Client & Patient Database:</b> Full visibility of registered clients, patient records, and booking history.",
        "<b>B2B Contract Oversight:</b> Manage institutional accounts, staffing requisitions, and facility coverage.",
        "<b>Staff Directory & Allocation:</b> Complete database of nurses/caregivers, certifications, shift availability, and duty logs.",
        "<b>Operations & Duty Assignment:</b> Review incoming care requests, assign suitable nursing staff, monitor active duties in real time.",
        "<b>Invoicing & Financial Records:</b> Generate invoices, update payment statuses, record transaction references, and monitor billing reports."
    ]
    for sub in admin_subsections:
        story.append(Paragraph(f"• {sub}", bullet_style))

    # Section 9: SERVICE CATEGORIES
    story.append(Spacer(1, 2))
    story.append(create_section_header("9. PRE-CONFIGURED HEALTHCARE SERVICE CATEGORIES"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("The platform will launch supporting five primary doorstep care categories:", body_style))
    categories = [
        "1. <b>Post-Operative Nursing Care:</b> Post-surgical recovery, wound dressing, catheter/IV care, and vitals monitoring.",
        "2. <b>Senior / Elderly Skilled Nursing:</b> Geriatric care, chronic disease management, medication administration.",
        "3. <b>12-Hour Day / Night Caregiver:</b> Half-day shift assistance for hygiene, mobility, feeding, and companionship.",
        "4. <b>24-Hour Live-In Caregiver:</b> Full-time round-the-clock home caregiving and continuous patient support.",
        "5. <b>High-Dependency Nursing Care:</b> Advanced nursing for bedridden, ventilator-assisted, or critical step-down patients."
    ]
    for cat in categories:
        story.append(Paragraph(cat, bullet_style))
    story.append(Paragraph("<i>Dynamic Architecture:</i> All service categories are managed via the Admin Panel, allowing Pulse n Care to update titles, descriptions, pricing structures, and custom booking form fields freely.", body_style))

    # Section 10: CARE REQUEST WORKFLOW
    story.append(Spacer(1, 2))
    story.append(create_section_header("10. CARE REQUEST & OPERATIONAL WORKFLOW"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("The core operational lifecycle from initial client request to completion:", body_style))
    workflow_steps = [
        "<b>Step 1 — Service Selection:</b> Client selects required care service category.",
        "<b>Step 2 — Patient & Location Info:</b> Client inputs patient condition, address, and special requirements.",
        "<b>Step 3 — Schedule & Shift Details:</b> Client specifies start date, duration, shift type (12h/24h), and timing.",
        "<b>Step 4 — Review & Submission:</b> Client verifies details and submits care request.",
        "<b>Operational Fulfillment Chain:</b><br/>"
        "<i>Client Request → Admin Review → Staff Assignment → Client Confirmation → Staff Duty Execution → Duty Completion → Invoicing & Payment Record</i>"
    ]
    for step in workflow_steps:
        story.append(Paragraph(f"• {step}", bullet_style))

    # Section 11: INTEGRATIONS & THIRD-PARTY SERVICES
    story.append(Spacer(1, 2))
    story.append(create_section_header("11. THIRD-PARTY INTEGRATIONS & COMMERCIAL EXCLUSIONS"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>WhatsApp Integration:</b> Qevnaro will implement transactional WhatsApp messaging (for booking alerts, duty updates, and confirmations) provided Client supplies active WhatsApp Business API / Meta BSP credentials. All messaging/API charges are paid directly by Client to Meta/BSP.", body_style))
    story.append(Paragraph("<b>Third-Party APIs:</b> Payment gateway transaction fees, SMS gateway fees, email service APIs (SendGrid/Mailgun), and Google Maps APIs are excluded from Qevnaro's development scope and billed directly to Client by respective service providers.", body_style))
    story.append(Paragraph("<b>Infrastructure & Hosting:</b> Client maintains ownership and direct payment for domain names, cloud hosting servers (AWS/DigitalOcean/Hostinger/Vercel), database hosting, and SSL certificates. Qevnaro provides deployment assistance.", body_style))

    # Section 12: INVESTMENT & PAYMENT STRUCTURE
    story.append(Spacer(1, 2))
    story.append(create_section_header("12. PROJECT INVESTMENT & MILESTONE SCHEDULE"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("The total fixed project value for all agreed deliverables is <b>Rs. 75,000 INR</b> (Seventy-Five Thousand Indian Rupees). "
                           "A project commencement deposit of <b>Rs. 10,000 INR</b> is collected prior to development initiation and is fully credited toward the total project value.", body_style))
    
    pay_table_data = [
        [
            Paragraph("<b>Project Stage / Milestone</b>", table_header_style),
            Paragraph("<b>Payment Breakdown</b>", table_header_style),
            Paragraph("<b>Payable Amount (Rs.)</b>", table_header_style)
        ],
        [
            Paragraph("<b>1. Security Deposit / Project Commencement</b><br/>Advance deposit prior to development initiation", table_cell_style),
            Paragraph("Fixed Advance<br/>(Adjusted against Total)", table_cell_style),
            Paragraph("<b>Rs. 10,000 INR</b>", table_cell_style)
        ],
        [
            Paragraph("<b>2. First Development Milestone</b><br/>Completion of UI/UX design & Public Website structure", table_cell_style),
            Paragraph("15% of Total Value", table_cell_style),
            Paragraph("<b>Rs. 11,250 INR</b>", table_cell_style)
        ],
        [
            Paragraph("<b>3. Second Development Milestone</b><br/>Client, Staff, B2B & Admin core workflows completion", table_cell_style),
            Paragraph("25% of Total Value", table_cell_style),
            Paragraph("<b>Rs. 18,750 INR</b>", table_cell_style)
        ],
        [
            Paragraph("<b>4. Final Milestone & Project Handover</b><br/>Final testing, deployment assistance & system handover", table_cell_style),
            Paragraph("50% Remaining Balance", table_cell_style),
            Paragraph("<b>Rs. 35,000 INR</b>", table_cell_style)
        ],
        [
            Paragraph("<b>TOTAL AGREED PROJECT VALUE</b>", table_header_style),
            Paragraph("<b>100% Contract Value</b>", table_header_style),
            Paragraph("<b>Rs. 75,000 INR</b>", table_header_style)
        ]
    ]
    pay_table = Table(pay_table_data, colWidths=[240, 135, 136])
    pay_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BACKGROUND', (0,-1), (-1,-1), c_secondary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#F8FAFC")),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#F8FAFC")),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(pay_table)

    # Section 13: RESPONSIBILITIES & CHANGE REQUESTS
    story.append(Spacer(1, 2))
    story.append(create_section_header("13. CLIENT RESPONSIBILITIES & SCOPE GOVERNANCE"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Client Input Timelines:</b> Client will provide logo assets, service content, pricing policies, tax rules, and third-party API keys in a timely manner. Delivery schedules automatically adjust for Client-caused delays.", body_style))
    story.append(Paragraph("<b>Medical & Legal Responsibility:</b> Pulse n Care is solely responsible for medical accuracy, clinical disclosures, staff qualifications, legal policies, privacy terms, and regulatory compliance.", body_style))
    story.append(Paragraph("<b>Change Requests:</b> Any major feature additions outside the approved scope (e.g., new standalone modules or new third-party systems) will be estimated and billed under a separate written addendum.", body_style))

    # Section 14: INCLUDED SUPPORT & STABILIZATION
    story.append(Spacer(1, 2))
    story.append(create_section_header("14. INCLUDED POST-DELIVERY SUPPORT & WARRANTY"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Following final delivery, Qevnaro provides the following complimentary post-delivery benefits:", body_style))
    story.append(Paragraph("• <b>Website Content Updates:</b> Modifications to 1–2 pre-existing static website sections.", bullet_style))
    story.append(Paragraph("• <b>Informational Pages:</b> Addition of up to 1–2 standard informational pages within existing layout templates.", bullet_style))
    story.append(Paragraph("• <b>Staff Operational Training:</b> One (1) guided training session for Pulse n Care operations staff.", bullet_style))
    story.append(Paragraph("• <b>Bug Stabilization Warranty:</b> 30-day technical support period to resolve any verified implementation bugs where functionality fails to match approved scope. Excludes third-party API outages or hosting failures.", bullet_style))

    # Section 15: INTELLECTUAL PROPERTY & DATA
    story.append(Spacer(1, 2))
    story.append(create_section_header("15. INTELLECTUAL PROPERTY, CONFIDENTIALITY & DATA"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Intellectual Property Ownership:</b> Upon full payment of the Rs. 75,000 project value, ownership of custom deliverables created specifically for Pulse n Care will be transferred to Client. Qevnaro retains ownership of its underlying frameworks, pre-existing code libraries, and generic tools.", body_style))
    story.append(Paragraph("<b>Confidentiality:</b> Both parties agree to protect proprietary business information, client data, patient details, staff records, and API credentials.", body_style))

    # Section 16: COMMERCIAL SCOPE MATRIX TABLE
    story.append(Spacer(1, 2))
    story.append(create_section_header("16. COMMERCIAL SCOPE & EXCLUSIONS MATRIX"))
    story.append(Spacer(1, 3))
    matrix_data = [
        [Paragraph("<b>Scope Deliverable / Item</b>", table_header_style), Paragraph("<b>Contract Inclusion Status</b>", table_header_style)],
        [Paragraph("Public Website + 4 Operational Panels (Client, Staff, B2B, Admin)", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b> in Rs. 75,000</font>", table_cell_style)],
        [Paragraph("Dynamic Service & Form Builder Module", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b> in Rs. 75,000</font>", table_cell_style)],
        [Paragraph("Care Request & Duty Assignment Workflows", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b> in Rs. 75,000</font>", table_cell_style)],
        [Paragraph("Invoice Record & Financial Tracking Module", table_cell_style), Paragraph("<font color='#047857'><b>INCLUDED</b> in Rs. 75,000</font>", table_cell_style)],
        [Paragraph("WhatsApp Integration Code Implementation", table_cell_style), Paragraph("<b>INCLUDED</b> (Client supplies API key)", table_cell_style)],
        [Paragraph("1 Staff Training Visit & 30-Day Bug Stabilization Warranty", table_cell_style), Paragraph("<b>INCLUDED</b>", table_cell_style)],
        [Paragraph("Domain Name Purchase & Cloud Server Hosting Fees", table_cell_style), Paragraph("<font color='#B91C1C'><b>EXCLUDED</b> (Client Direct Pay)</font>", table_cell_style)],
        [Paragraph("WhatsApp Meta API / Per-Message Usage Charges", table_cell_style), Paragraph("<font color='#B91C1C'><b>EXCLUDED</b> (Client Direct Pay)</font>", table_cell_style)],
        [Paragraph("Payment Gateway & Transaction Processing Fees", table_cell_style), Paragraph("<font color='#B91C1C'><b>EXCLUDED</b> (Client Direct Pay)</font>", table_cell_style)]
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
        ('BACKGROUND', (0,7), (-1,7), c_red_bg),
        ('BACKGROUND', (0,8), (-1,8), c_red_bg),
        ('BACKGROUND', (0,9), (-1,9), c_red_bg),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(matrix_table)

    # Section 17: SIGNATURE BLOCK
    story.append(Spacer(1, 2))
    story.append(create_section_header("17. ACCEPTANCE & EXECUTION SIGNATURES"))
    story.append(Spacer(1, 3))
    story.append(Paragraph("By signing below, both Qevnaro and Pulse n Care formally accept and execute this Agreement in accordance with all scope details, payment structures, and legal terms contained herein.", body_style))
    story.append(Spacer(1, 3))

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
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    
    # Keep signature block together on one page
    story.append(KeepTogether(sig_table))

    # Build Document
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background, canvasmaker=NumberedCanvas)
    print(f"PDF built successfully: {filename}")

if __name__ == '__main__':
    build_pdf()
