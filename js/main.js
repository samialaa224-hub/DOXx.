// البيانات الأولية
const servicesData = [
    {
        id: 1,
        icon: "fas fa-utensils",
        title: "مساعدات غذائية",
        description: "طرود غذائية تحتوي على المواد الأساسية لتغذية الأسرة لمدة أسبوعين",
        color: "text-primary",
        bgColor: "#e3f2fd"
    },
    {
        id: 2,
        icon: "fas fa-briefcase-medical",
        title: "مساعدات طبية",
        description: "أدوية أساسية ومستلزمات طبية للإسعافات الأولية والعلاجات الأساسية",
        color: "text-success",
        bgColor: "#e8f5e9"
    },
    {
        id: 3,
        icon: "fas fa-tint",
        title: "مياه صالحة للشرب",
        description: "توزيع عبوات مياه صحية وتنقية المياه في المناطق المتضررة",
        color: "text-info",
        bgColor: "#e0f7fa"
    },
    {
        id: 4,
        icon: "fas fa-home",
        title: "مواد إيواء",
        description: "خيام، أغطية، مرتبات، ومواد بناء طارئة للمشردين",
        color: "text-warning",
        bgColor: "#fff3e0"
    }
];

const distributionPoints = [
    { id: 1, area: "غزة", type: "غذاء", location: "مدرسة الشجاعية الثانوية", time: "9:00 صباحاً", status: "متاح", details: "طرود غذائية لـ 500 عائلة" },
    { id: 2, area: "رفح", type: "دواء", location: "مستشفى الإمارات", time: "11:00 صباحاً", status: "متاح", details: "أدوية مزمنة وإسعافات أولية" },
    { id: 3, area: "خان يونس", type: "مياه", location: "بلدة بني سهيلا", time: "2:00 ظهراً", status: "مكتمل", details: "تم توزيع 1000 عبوة مياه" },
    { id: 4, area: "غزة", type: "إيواء", location: "مخيم جباليا", time: "4:00 عصراً", status: "متاح", details: "خيام وأغطية لـ 200 عائلة" },
    { id: 5, area: "دير البلح", type: "غذاء", location: "جمعية البر والتقوى", time: "10:00 صباحاً", status: "متاح", details: "وجبات ساخنة يومية" },
    { id: 6, area: "بيت لاهيا", type: "دواء", location: "عيادة بيت لاهيا", time: "1:00 ظهراً", status: "مكتمل", details: "تم توزيع جميع المستلزمات" },
    { id: 7, area: "رفح", type: "مياه", location: "مخيم تل السلطان", time: "3:00 عصراً", status: "متاح", details: "نقاط توزيع مياه شرب" },
    { id: 8, area: "جباليا", type: "إيواء", location: "مركز جباليا الاجتماعي", time: "5:00 مساءً", status: "متاح", details: "مواد بناء طارئة" }
];

const faqData = [
    {
        question: "كيف يمكنني التسجيل للحصول على المساعدة؟",
        answer: "يمكنك تعبئة نموذج طلب المساعدة في الموقع أو التوجه إلى أقرب نقطة توزيع مع الهوية الشخصية وبطاقة العائلة."
    },
    {
        question: "هل هناك شروط للحصول على المساعدات؟",
        answer: "نعم، يجب أن تكون الأسرة متضررة بشكل مباشر من الحرب وتعيش في مناطق متضررة، مع إثبات حالة السكن والمعيشة."
    },
    {
        question: "كم تستغرق عملية معالجة الطلب؟",
        answer: "تتم معالجة الطلبات خلال 24-48 ساعة، وسيتم التواصل معك عبر الهاتف لتأكيد الموعد والمكان."
    },
    {
        question: "هل يمكنني التبرع أو التطوع؟",
        answer: "نعم، يمكنك التواصل عبر البريد الإلكتروني أو الهاتف الموجود في قسم 'اتصل بنا' للمساهمة في جهود الإغاثة."
    },
    {
        question: "هل الخدمات مجانية؟",
        answer: "نعم، جميع الخدمات التي نقدمها مجانية تمامًا ولا نطلب أي مقابل مادي من المستفيدين."
    }
];

// DOM Ready
$(document).ready(function() {
    // Check for saved dark mode preference first
    if (localStorage.getItem('darkMode') === 'enabled') {
        $('body').addClass('dark-mode');
        $('#darkModeToggle i').removeClass('fa-moon').addClass('fa-sun');
    }
    
    // Initialize Services Section
    renderServices();
    
    // Initialize Distribution Table
    renderDistributionTable();
    updateStatistics();
    
    // Initialize FAQ Accordion
    renderFAQ();
    
    // Initialize Event Listeners
    setupEventListeners();
    
    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });
});

// Render Services
function renderServices() {
    const servicesContainer = $('#services .row');
    servicesContainer.empty();
    
    servicesData.forEach(service => {
        const serviceHTML = `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card service-card shadow-sm h-100">
                    <div class="card-body text-center p-4">
                        <div class="service-icon ${service.color}">
                            <i class="${service.icon}"></i>
                        </div>
                        <h5 class="card-title fw-bold">${service.title}</h5>
                        <p class="card-text">${service.description}</p>
                        <button class="btn btn-outline-primary btn-sm view-details" 
                                data-id="${service.id}">
                            <i class="fas fa-info-circle me-1"></i>تفاصيل أكثر
                        </button>
                    </div>
                </div>
            </div>
        `;
        servicesContainer.append(serviceHTML);
    });
}

// Render Distribution Table
function renderDistributionTable(data = distributionPoints) {
    const tableBody = $('#distributionTable');
    tableBody.empty();
    
    data.forEach(point => {
        const statusClass = point.status === 'متاح' ? 'status-available' : 'status-completed';
        const rowHTML = `
            <tr>
                <td>${point.area}</td>
                <td>${point.type}</td>
                <td>${point.location}</td>
                <td>${point.time}</td>
                <td class="${statusClass}">${point.status}</td>
                <td>
                    <button class="btn btn-sm btn-outline-info view-details-btn" 
                            data-id="${point.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.append(rowHTML);
    });
}

// Update Statistics
function updateStatistics() {
    const foodCount = distributionPoints.filter(p => p.type === 'غذاء' && p.status === 'متاح').length * 500;
    const medicalCount = distributionPoints.filter(p => p.type === 'دواء' && p.status === 'متاح').length * 300;
    const waterCount = distributionPoints.filter(p => p.type === 'مياه' && p.status === 'متاح').length * 1000;
    const shelterCount = distributionPoints.filter(p => p.type === 'إيواء' && p.status === 'متاح').length * 200;
    
    $('#foodCount').text(foodCount.toLocaleString());
    $('#medicalCount').text(medicalCount.toLocaleString());
    $('#waterCount').text(waterCount.toLocaleString());
    $('#shelterCount').text(shelterCount.toLocaleString());
}

// Render FAQ Accordion
function renderFAQ() {
    const faqContainer = $('#faqAccordion');
    faqContainer.empty();
    
    faqData.forEach((faq, index) => {
        const faqHTML = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapse${index}">
                        ${faq.question}
                    </button>
                </h2>
                <div id="collapse${index}" 
                     class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `;
        faqContainer.append(faqHTML);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Dark Mode Toggle
    $('#darkModeToggle').click(function() {
        $('body').toggleClass('dark-mode');
        const icon = $(this).find('i');
        if ($('body').hasClass('dark-mode')) {
            icon.removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Filter Distribution Points
    $('#searchInput').on('keyup', function() {
        filterDistributionPoints();
    });
    
    $('#filterType').change(function() {
        filterDistributionPoints();
    });
    
    // Family Size Slider
    $('#familySize').on('input', function() {
        $('#familySizeValue').text($(this).val() + ' أفراد');
    });
    
    // Marital Status Change
    $('#maritalStatus').change(function() {
        const status = $(this).val();
        if (status === 'متزوج') {
            $('#spouseInfo').removeClass('d-none');
            $('#spouseName, #spouseId').attr('required', true);
        } else {
            $('#spouseInfo').addClass('d-none');
            $('#spouseName, #spouseId').removeAttr('required').val('');
        }
    });
    
    // Form Submission
    $('#helpRequestForm').submit(function(e) {
        e.preventDefault();
        
        // Form Validation
        const isValid = validateForm();
        if (!isValid) return;
        
        // Simulate form submission
        const formData = {
            name: $('#name').val(),
            idNumber: $('#idNumber').val(),
            phone: $('#phone').val(),
            maritalStatus: $('#maritalStatus').val(),
            spouseName: $('#spouseName').val(),
            spouseId: $('#spouseId').val(),
            address: $('#address').val(),
            region: $('#region').val(),
            aidType: $('#aidType').val(),
            familySize: $('#familySize').val(),
            details: $('#details').val(),
            timestamp: new Date().toLocaleString('ar-EG')
        };
        
        // Show success message
        const messageDiv = $('#formMessage');
        messageDiv.removeClass('d-none alert-danger').addClass('alert-success');
        messageDiv.html(`
            <i class="fas fa-check-circle me-2"></i>
            <strong>تم استلام طلبك بنجاح!</strong><br>
            رقم الطلب: #${Math.floor(Math.random() * 10000)}<br>
            سيتم التواصل معك على الرقم ${formData.phone} خلال 24 ساعة
        `);
        
        // Reset form
        this.reset();
        $('#familySizeValue').text('5 أفراد');
        
        // Scroll to message
        $('html, body').animate({
            scrollTop: messageDiv.offset().top - 100
        }, 1000);
        
        // Log form data (in real app, send to server)
        console.log('Form submitted:', formData);
    });
    
    // Video Controls
    const video = $('#helpVideo')[0];
    
    $('#playPauseBtn').click(function() {
        if (video.paused) {
            video.play();
            $(this).html('<i class="fas fa-pause"></i> إيقاف');
        } else {
            video.pause();
            $(this).html('<i class="fas fa-play"></i> تشغيل');
        }
    });
    
    $('#muteBtn').click(function() {
        video.muted = !video.muted;
        $(this).html(video.muted ? 
            '<i class="fas fa-volume-mute"></i> إلغاء الكتم' : 
            '<i class="fas fa-volume-up"></i> كتم');
    });
    
    // Update video time
    video.addEventListener('timeupdate', function() {
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        $('#videoTime').text(`${currentTime} / ${duration}`);
    });
    
    // View Details Buttons
    $(document).on('click', '.view-details-btn', function() {
        const id = $(this).data('id');
        const point = distributionPoints.find(p => p.id === id);
        showPointDetails(point);
    });
    
    $(document).on('click', '.view-details', function() {
        const id = $(this).data('id');
        const service = servicesData.find(s => s.id === id);
        showServiceDetails(service);
    });
}

// Filter Distribution Points
function filterDistributionPoints() {
    const searchTerm = $('#searchInput').val().toLowerCase();
    const filterType = $('#filterType').val();
    
    let filteredData = distributionPoints;
    
    // Filter by search term
    if (searchTerm) {
        filteredData = filteredData.filter(point => 
            point.area.toLowerCase().includes(searchTerm) || 
            point.location.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by type
    if (filterType !== 'all') {
        filteredData = filteredData.filter(point => point.type === filterType);
    }
    
    renderDistributionTable(filteredData);
}

// Form Validation
function validateForm() {
    let isValid = true;
    
    // Validate name
    if ($('#name').val().trim() === '') {
        $('#name').addClass('is-invalid');
        isValid = false;
    } else {
        $('#name').removeClass('is-invalid');
    }
    
    // Validate ID number
    const idPattern = /^[0-9]{9}$/;
    if (!idPattern.test($('#idNumber').val())) {
        $('#idNumber').addClass('is-invalid');
        isValid = false;
    } else {
        $('#idNumber').removeClass('is-invalid');
    }
    
    // Validate phone
    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test($('#phone').val())) {
        $('#phone').addClass('is-invalid');
        isValid = false;
    } else {
        $('#phone').removeClass('is-invalid');
    }
    
    // Validate marital status
    if ($('#maritalStatus').val() === '') {
        $('#maritalStatus').addClass('is-invalid');
        isValid = false;
    } else {
        $('#maritalStatus').removeClass('is-invalid');
    }
    
    // Validate spouse info if married
    if ($('#maritalStatus').val() === 'متزوج') {
        if ($('#spouseName').val().trim() === '') {
            $('#spouseName').addClass('is-invalid');
            isValid = false;
        } else {
            $('#spouseName').removeClass('is-invalid');
        }
        
        if (!idPattern.test($('#spouseId').val())) {
            $('#spouseId').addClass('is-invalid');
            isValid = false;
        } else {
            $('#spouseId').removeClass('is-invalid');
        }
    }
    
    // Validate required fields
    $('select[required]').each(function() {
        if ($(this).val() === '') {
            $(this).addClass('is-invalid');
            isValid = false;
        } else {
            $(this).removeClass('is-invalid');
        }
    });
    
    $('textarea[required]').each(function() {
        if ($(this).val().trim() === '') {
            $(this).addClass('is-invalid');
            isValid = false;
        } else {
            $(this).removeClass('is-invalid');
        }
    });
    
    return isValid;
}

// Show Point Details Modal
function showPointDetails(point) {
    const modalHTML = `
        <div class="modal fade" id="detailsModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">تفاصيل نقطة التوزيع</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>المنطقة:</strong> ${point.area}</p>
                        <p><strong>نوع المساعدة:</strong> ${point.type}</p>
                        <p><strong>المكان:</strong> ${point.location}</p>
                        <p><strong>الموعد:</strong> ${point.time}</p>
                        <p><strong>الحالة:</strong> <span class="${point.status === 'متاح' ? 'status-available' : 'status-completed'}">${point.status}</span></p>
                        <p><strong>تفاصيل:</strong> ${point.details}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    $('#detailsModal').remove();
    
    // Add new modal and show it
    $('body').append(modalHTML);
    const modal = new bootstrap.Modal($('#detailsModal'));
    modal.show();
}

// Show Service Details Modal
function showServiceDetails(service) {
    const modalHTML = `
        <div class="modal fade" id="serviceModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${service.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="${service.color} mb-3">
                            <i class="${service.icon} fa-4x"></i>
                        </div>
                        <p>${service.description}</p>
                        <hr>
                        <h6>نقاط التوزيع لهذه الخدمة:</h6>
                        <ul class="list-group">
                            ${distributionPoints.filter(p => p.type === service.title.split(' ')[1]).map(p => 
                                `<li class="list-group-item">${p.area} - ${p.location} (${p.time})</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    $('#serviceModal').remove();
    
    // Add new modal and show it
    $('body').append(modalHTML);
    const modal = new bootstrap.Modal($('#serviceModal'));
    modal.show();
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Animate elements on scroll
$(window).scroll(function() {
    $('.service-card').each(function() {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            $(this).addClass('animated');
        }
    });
});