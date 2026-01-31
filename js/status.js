// بيانات المستخدمين (في تطبيق حقيقي، ستأتي من قاعدة بيانات)
const userRequests = [
    {
        id: "REQ-2024-001",
        nationalId: "123456789",
        password: "gaza123",
        name: "أحمد محمد عبد الله",
        region: "غزة",
        aidType: "مساعدات غذائية",
        familySize: 7,
        requestDate: "2024-03-15",
        status: "قيد المراجعة",
        statusCode: 2,
        secretCode: "GZ-5A8B3C",
        distributionLocation: "مدرسة الشجاعية الثانوية",
        distributionTime: "2024-03-20 الساعة 9:00 صباحاً",
        estimatedTime: "3-5 أيام عمل",
        timeline: [
            { step: "تقديم الطلب", date: "2024-03-15 10:30", completed: true },
            { step: "المراجعة الأولية", date: "2024-03-16", completed: true },
            { step: "الموافقة", date: "", completed: false },
            { step: "التوزيع", date: "", completed: false },
            { step: "الإستلام", date: "", completed: false }
        ]
    },
    {
        id: "REQ-2024-002",
        nationalId: "987654321",
        password: "help456",
        name: "فاطمة خالد إسماعيل",
        region: "رفح",
        aidType: "مساعدات طبية",
        familySize: 5,
        requestDate: "2024-03-10",
        status: "مقبول",
        statusCode: 3,
        secretCode: "GZ-9D2E7F",
        distributionLocation: "مستشفى الإمارات",
        distributionTime: "2024-03-18 الساعة 11:00 صباحاً",
        estimatedTime: "مستعد للاستلام",
        timeline: [
            { step: "تقديم الطلب", date: "2024-03-10 14:20", completed: true },
            { step: "المراجعة الأولية", date: "2024-03-11", completed: true },
            { step: "الموافقة", date: "2024-03-12", completed: true },
            { step: "التوزيع", date: "2024-03-18", completed: false },
            { step: "الإستلام", date: "", completed: false }
        ]
    },
    {
        id: "REQ-2024-003",
        nationalId: "456123789",
        password: "aid789",
        name: "محمد يوسف أحمد",
        region: "خان يونس",
        aidType: "مياه صالحة للشرب",
        familySize: 9,
        requestDate: "2024-03-05",
        status: "مكتمل",
        statusCode: 5,
        secretCode: "GZ-1C4A6B",
        distributionLocation: "بلدة بني سهيلا",
        distributionTime: "تم التوزيع في 2024-03-12",
        estimatedTime: "تم الاستلام",
        timeline: [
            { step: "تقديم الطلب", date: "2024-03-05 09:15", completed: true },
            { step: "المراجعة الأولية", date: "2024-03-06", completed: true },
            { step: "الموافقة", date: "2024-03-07", completed: true },
            { step: "التوزيع", date: "2024-03-12", completed: true },
            { step: "الإستلام", date: "2024-03-12", completed: true }
        ]
    }
];

// DOM Ready
$(document).ready(function() {
    // التحقق من وجود جلسة مسجلة
    checkSavedSession();
    
    // عرض/إخفاء كلمة السر
    $('#togglePassword').click(function() {
        const passwordInput = $('#password');
        const icon = $(this).find('i');
        
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    // تسجيل الدخول
    $('#statusLoginForm').submit(function(e) {
        e.preventDefault();
        loginUser();
    });
    
    // نسيت كلمة السر
    $('#forgotPassword').click(function() {
        $('#forgotPasswordModal').modal('show');
    });
    
    // إرسال استعادة كلمة السر
    $('#sendRecovery').click(function() {
        const recoveryId = $('#recoveryId').val().trim();
        const messageDiv = $('#recoveryMessage');
        
        if (!recoveryId || recoveryId.length !== 9) {
            showMessage(messageDiv, 'يرجى إدخال رقم هوية صحيح (9 أرقام)', 'danger');
            return;
        }
        
        // محاكاة إرسال كلمة سر جديدة
        const newPassword = generatePassword(8);
        showMessage(messageDiv, 
            `تم إرسال كلمة سر جديدة إلى هاتفك المسجل: <strong>${newPassword}</strong>`, 
            'success'
        );
        
        // تحديث كلمة السر في البيانات (في تطبيق حقيقي: تحديث قاعدة البيانات)
        const userIndex = userRequests.findIndex(u => u.nationalId === recoveryId);
        if (userIndex !== -1) {
            userRequests[userIndex].password = newPassword;
        }
        
        // إغلاق النافذة بعد 3 ثواني
        setTimeout(() => {
            $('#forgotPasswordModal').modal('hide');
            messageDiv.addClass('d-none');
        }, 3000);
    });
    
    // طباعة الحالة
    $('#printStatus').click(function() {
        window.print();
    });
    
    // إرسال رسالة نصية
    $('#sendSMS').click(function() {
        const requestId = $('#requestId').text();
        alert(`تم إرسال رسالة نصية تحتوي على تفاصيل الطلب ${requestId} إلى هاتفك`);
    });
    
    // الخروج
    $('#logoutBtn').click(function() {
        logoutUser();
    });
    
    // عرض الخريطة
    $('#viewMap').click(function() {
        const location = $('#distributionLocation').text();
        alert(`سيتم فتح خريطة توضح موقع: ${location}\n(هذه خاصية تجريبية)`);
    });
    
    // ضبط التذكير
    $('#setReminder').click(function() {
        const time = $('#distributionTime').text();
        if (time !== "سيتم تحديده لاحقًا") {
            alert(`تم ضبط تذكير لموعد الاستلام: ${time}`);
        } else {
            alert("لم يتم تحديد موعد التوزيع بعد");
        }
    });
    
    // محادثة الدعم
    $('#contactSupport').click(function() {
        alert("جارٍ تحويلك إلى الدعم الفني...\nيرجى الانتظار قليلاً");
    });
});

// التحقق من الجلسة المسجلة
function checkSavedSession() {
    const savedId = localStorage.getItem('savedNationalId');
    const savedPassword = localStorage.getItem('savedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (rememberMe && savedId && savedPassword) {
        $('#nationalId').val(savedId);
        $('#password').val(savedPassword);
        $('#rememberMe').prop('checked', true);
        
        // تسجيل الدخول تلقائيًا بعد تأخير بسيط
        setTimeout(() => {
            const user = authenticateUser(savedId, savedPassword);
            if (user) {
                showUserStatus(user);
            }
        }, 500);
    }
}

// تسجيل الدخول
function loginUser() {
    const nationalId = $('#nationalId').val().trim();
    const password = $('#password').val();
    const rememberMe = $('#rememberMe').is(':checked');
    const messageDiv = $('#loginMessage');
    
    // التحقق من صحة البيانات
    if (nationalId.length !== 9 || !/^\d+$/.test(nationalId)) {
        showMessage(messageDiv, 'رقم الهوية يجب أن يكون 9 أرقام فقط', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showMessage(messageDiv, 'كلمة السر يجب أن تكون 6 أحرف على الأقل', 'danger');
        return;
    }
    
    // المصادقة
    const user = authenticateUser(nationalId, password);
    
    if (user) {
        // حفظ البيانات إذا طلب المستخدم
        if (rememberMe) {
            localStorage.setItem('savedNationalId', nationalId);
            localStorage.setItem('savedPassword', password);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedNationalId');
            localStorage.removeItem('savedPassword');
            localStorage.removeItem('rememberMe');
        }
        
        // حفظ جلسة المستخدم
        sessionStorage.setItem('currentUserId', nationalId);
        sessionStorage.setItem('userLoggedIn', 'true');
        
        // عرض حالة المستخدم
        showUserStatus(user);
    } else {
        showMessage(messageDiv, 'رقم الهوية أو كلمة السر غير صحيحة', 'danger');
    }
}

// مصادقة المستخدم
function authenticateUser(nationalId, password) {
    return userRequests.find(user => 
        user.nationalId === nationalId && user.password === password
    );
}

// عرض حالة المستخدم
function showUserStatus(user) {
    // إخفاء صفحة تسجيل الدخول
    $('#loginPage').hide();
    
    // ملء بيانات المستخدم
    $('#requestNumber').text(`طلب ${user.id}`);
    $('#userName').text(user.name);
    $('#userNationalId').text(user.nationalId);
    $('#userRegion').text(user.region);
    $('#aidType').text(user.aidType);
    $('#familySize').text(`${user.familySize} أفراد`);
    $('#requestId').text(user.id);
    $('#requestDate').text(user.requestDate);
    $('#estimatedTime').text(user.estimatedTime);
    $('#secretCode').text(user.secretCode);
    $('#distributionLocation').text(user.distributionLocation);
    $('#distributionTime').text(user.distributionTime);
    
    // تحديث حالة الطلب
    updateStatusBadge(user.status, user.statusCode);
    
    // تحديث خط سير العملية
    updateTimeline(user.timeline);
    
    // إظهار صفحة الحالة مع تأثير
    $('#statusPage').fadeIn(1000);
    
    // تمرير سلس للمحتوى
    $('html, body').animate({ scrollTop: 0 }, 500);
}

// تحديث شارة الحالة
function updateStatusBadge(status, statusCode) {
    const badge = $('#requestStatus');
    badge.text(status);
    
    // تغيير اللون حسب الحالة
    badge.removeClass('bg-secondary bg-primary bg-warning bg-success bg-danger');
    
    switch(statusCode) {
        case 1: // مقدم
            badge.addClass('bg-secondary');
            break;
        case 2: // قيد المراجعة
            badge.addClass('bg-primary');
            break;
        case 3: // مقبول
            badge.addClass('bg-warning');
            break;
        case 4: // جاهز للتوزيع
            badge.addClass('bg-info');
            break;
        case 5: // مكتمل
            badge.addClass('bg-success');
            break;
        case 6: // مرفوض
            badge.addClass('bg-danger');
            break;
        default:
            badge.addClass('bg-secondary');
    }
}

// تحديث خط سير العملية
function updateTimeline(timeline) {
    timeline.forEach((item, index) => {
        const stepNumber = index + 1;
        $(`#step${stepNumber}Date`).text(item.date || '-');
        
        const timelineItem = $(`.timeline-item:nth-child(${stepNumber})`);
        timelineItem.removeClass('active completed');
        
        if (item.completed) {
            timelineItem.addClass('completed');
        } else if (index === 1 && !item.completed) {
            timelineItem.addClass('active');
        } else if (index > 1 && timeline[index-1].completed && !item.completed) {
            timelineItem.addClass('active');
        }
    });
}

// تسجيل الخروج
function logoutUser() {
    // مسح جلسة المستخدم
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('userLoggedIn');
    
    // إخفاء صفحة الحالة
    $('#statusPage').fadeOut(500, function() {
        // إظهار صفحة تسجيل الدخول
        $('#loginPage').fadeIn(500);
        
        // مسح حقول النموذج
        $('#password').val('');
        $('#loginMessage').addClass('d-none').empty();
        
        // إذا لم يكن تذكرني محدد، مسح حقول الإدخال
        if (!$('#rememberMe').is(':checked')) {
            $('#nationalId').val('');
        }
        
        // التمرير للأعلى
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
}

// عرض رسالة
function showMessage(element, message, type = 'info') {
    element.removeClass('d-none alert-info alert-success alert-danger alert-warning')
           .addClass(`alert-${type}`)
           .html(message);
    
    // إخفاء الرسالة بعد 5 ثواني
    if (type !== 'danger') {
        setTimeout(() => {
            element.addClass('d-none');
        }, 5000);
    }
}

// توليد كلمة سر عشوائية
function generatePassword(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// منع الوصول المباشر للصفحة بدون تسجيل دخول
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const currentUserId = sessionStorage.getItem('currentUserId');
    
    if (isLoggedIn && currentUserId) {
        const user = userRequests.find(u => u.nationalId === currentUserId);
        if (user) {
            showUserStatus(user);
        }
    }
});

// إضافة تأثيرات للجدول الزمني عند التمرير
$(window).scroll(function() {
    $('.timeline-item').each(function() {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            if (!$(this).hasClass('animated')) {
                $(this).addClass('animated');
                $(this).css({
                    'opacity': '0',
                    'transform': 'translateY(20px)'
                }).animate({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                }, 800);
            }
        }
    });
});