// script.js
(function() {
    const form = document.getElementById('mainForm');
    const panelBody = document.getElementById('panelBody');
    const clearBtn = document.getElementById('clearDataBtn');
    const dataCount = document.getElementById('dataCount');
    let submittedData = [];

    // Fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const country = document.getElementById('country');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Message containers
    const nameMsg = document.getElementById('nameMessage');
    const emailMsg = document.getElementById('emailMessage');
    const phoneMsg = document.getElementById('phoneMessage');
    const ageMsg = document.getElementById('ageMessage');
    const countryMsg = document.getElementById('countryMessage');
    const subjectMsg = document.getElementById('subjectMessage');
    const messageMsg = document.getElementById('messageTextMessage');
    const formStatus = document.getElementById('formStatus');

    // Progress elements
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const nameCount = document.getElementById('nameCount');
    const msgCount = document.getElementById('msgCount');

    // Helper: show message
    function setMessage(el, text, type) {
        el.textContent = text;
        el.className = `message ${type}`;
        if (text === '') {
            el.classList.add('hidden');
        } else {
            el.classList.remove('hidden');
        }
    }

    // Helper: mark input state
    function setInputState(input, isValid) {
        input.classList.remove('error', 'success');
        if (isValid === true) input.classList.add('success');
        else if (isValid === false) input.classList.add('error');
    }

    // Update character counters
    function updateCounters() {
        const nameLen = fullName.value.length;
        const msgLen = message.value.length;
        nameCount.textContent = `${nameLen}/50`;
        msgCount.textContent = `${msgLen}/500`;

        nameCount.classList.remove('warning', 'danger');
        if (nameLen > 40) nameCount.classList.add('warning');
        if (nameLen > 48) nameCount.classList.add('danger');

        msgCount.classList.remove('warning', 'danger');
        if (msgLen > 400) msgCount.classList.add('warning');
        if (msgLen > 480) msgCount.classList.add('danger');
    }

    // Update progress bar
    function updateProgress() {
        const fields = [fullName, email, phone, age, country, subject, message];
        let filled = 0;
        fields.forEach(field => {
            if (field.value && field.value.trim() !== '') {
                filled++;
            }
        });
        if (country.value === '') filled--;
        if (subject.value === '') filled--;

        const total = fields.length;
        const percent = Math.round((filled / total) * 100);
        const style = document.createElement('style');
        style.id = 'progressStyle';
        const oldStyle = document.getElementById('progressStyle');
        if (oldStyle) oldStyle.remove();
        style.id = 'progressStyle';
        style.textContent = `.progress-bar::after { width: ${percent}%; }`;
        document.head.appendChild(style);
        progressText.textContent = `${percent}%`;
    }

    // ---------- Validation Functions ----------
    function validateName() {
        const val = fullName.value.trim();
        const isValid = val.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-']+$/.test(val);
        if (!isValid && val.length > 0) {
            setMessage(nameMsg, '❌ Name must be at least 2 letters (no numbers/special chars).', 'error');
        } else if (val.length === 0) {
            setMessage(nameMsg, '⚠️ Full name is required.', 'error');
        } else {
            setMessage(nameMsg, '✅ Looks good!', 'success');
        }
        setInputState(fullName, isValid ? true : (val.length > 0 ? false : null));
        updateCounters();
        updateProgress();
        return isValid;
    }

    function validateEmail() {
        const val = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(val);
        if (!isValid && val.length > 0) {
            setMessage(emailMsg, '❌ Enter a valid email (e.g., name@domain.com).', 'error');
        } else if (val.length === 0) {
            setMessage(emailMsg, '⚠️ Email is required.', 'error');
        } else {
            setMessage(emailMsg, '✅ Valid email!', 'success');
        }
        setInputState(email, isValid ? true : (val.length > 0 ? false : null));
        updateProgress();
        return isValid;
    }

    function validatePhone() {
        const val = phone.value.trim();
        const clean = val.replace(/[\s\-\(\)\.\+]/g, '');
        const isValid = clean.length >= 7 && /^[0-9]+$/.test(clean);
        if (!isValid && val.length > 0) {
            setMessage(phoneMsg, '❌ Phone must have at least 7 digits (only + - . ( ) allowed).', 'error');
        } else if (val.length === 0) {
            setMessage(phoneMsg, '⚠️ Phone number is required.', 'error');
        } else {
            setMessage(phoneMsg, '✅ Phone looks valid!', 'success');
        }
        setInputState(phone, isValid ? true : (val.length > 0 ? false : null));
        updateProgress();
        return isValid;
    }

    function validateAge() {
        const val = age.value.trim();
        const num = Number(val);
        const isValid = val !== '' && Number.isInteger(num) && num >= 18 && num <= 120;
        if (!isValid && val.length > 0) {
            setMessage(ageMsg, '❌ Age must be 18–120 (whole number).', 'error');
        } else if (val.length === 0) {
            setMessage(ageMsg, '⚠️ Age is required.', 'error');
        } else {
            setMessage(ageMsg, '✅ Age accepted!', 'success');
        }
        setInputState(age, isValid ? true : (val.length > 0 ? false : null));
        updateProgress();
        return isValid;
    }

    function validateCountry() {
        const val = country.value;
        const isValid = val !== '';
        if (!isValid) {
            setMessage(countryMsg, '⚠️ Please select a country.', 'error');
        } else {
            setMessage(countryMsg, '✅ Selected!', 'success');
        }
        setInputState(country, isValid ? true : false);
        updateProgress();
        return isValid;
    }

    function validateSubject() {
        const val = subject.value;
        const isValid = val !== '';
        if (!isValid) {
            setMessage(subjectMsg, '⚠️ Please select a subject.', 'error');
        } else {
            setMessage(subjectMsg, '✅ Selected!', 'success');
        }
        setInputState(subject, isValid ? true : false);
        updateProgress();
        return isValid;
    }

    function validateMessage() {
        const val = message.value.trim();
        const isValid = val.length >= 5;
        if (!isValid && val.length > 0) {
            setMessage(messageMsg, '❌ Message must be at least 5 characters.', 'error');
        } else if (val.length === 0) {
            setMessage(messageMsg, '⚠️ Message is required.', 'error');
        } else {
            setMessage(messageMsg, '✅ Great message!', 'success');
        }
        setInputState(message, isValid ? true : (val.length > 0 ? false : null));
        updateCounters();
        updateProgress();
        return isValid;
    }

    // Aggregate validation
    function validateAll() {
        const isName = validateName();
        const isEmail = validateEmail();
        const isPhone = validatePhone();
        const isAge = validateAge();
        const isCountry = validateCountry();
        const isSubject = validateSubject();
        const isMessage = validateMessage();
        return isName && isEmail && isPhone && isAge && isCountry && isSubject && isMessage;
    }

    // Update status badge
    function updateStatus(valid) {
        formStatus.classList.remove('success', 'error', 'validating');
        if (valid === true) {
            formStatus.textContent = '✅ All valid!';
            formStatus.className = 'status-badge success';
        } else if (valid === false) {
            formStatus.textContent = '❌ Please fix errors';
            formStatus.className = 'status-badge error';
        } else {
            formStatus.textContent = '✨ Fill in fields';
            formStatus.className = 'status-badge validating';
        }
    }

    // Render submitted data
    function renderData() {
        if (submittedData.length === 0) {
            panelBody.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📭</span>
                    <p>No data submitted yet</p>
                    <small>Fill the form and click Submit</small>
                </div>
            `;
            dataCount.textContent = '0';
            return;
        }

        let html = '';
        const itemLabels = {
            name: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            age: 'Age',
            country: 'Country',
            subject: 'Subject',
            message: 'Message'
        };

        submittedData.forEach((data, index) => {
            const label = itemLabels[data.key] || data.key;
            const isEmail = data.key === 'email';
            html += `
                <div class="data-item" style="animation-delay: ${index * 0.08}s">
                    <span class="label">${label}</span>
                    <span class="value ${isEmail ? 'email-val' : ''}">${data.value}</span>
                </div>
            `;
        });
        panelBody.innerHTML = html;
        dataCount.textContent = submittedData.length;
    }

    // Add data to panel
    function addDataToPanel(formData) {
        const dataItems = [
            { key: 'name', value: formData.name },
            { key: 'email', value: formData.email },
            { key: 'phone', value: formData.phone },
            { key: 'age', value: formData.age },
            { key: 'country', value: formData.country },
            { key: 'subject', value: formData.subject },
            { key: 'message', value: formData.message }
        ];
        submittedData = dataItems;
        renderData();
    }

    // Attach blur validation
    function attachBlur(validateFn) {
        return function() {
            const isValid = validateFn();
            const allValid = validateAll();
            updateStatus(allValid);
        };
    }

    // Live validation on input
    function attachInput(validateFn) {
        return function() {
            const val = this.value;
            if (val && val.trim() !== '') {
                const isValid = validateFn();
                const allValid = validateAll();
                updateStatus(allValid);
            } else {
                this.classList.remove('error', 'success');
                const msgMap = {
                    fullName: nameMsg,
                    email: emailMsg,
                    phone: phoneMsg,
                    age: ageMsg,
                    country: countryMsg,
                    subject: subjectMsg,
                    message: messageMsg
                };
                const msgEl = msgMap[this.id];
                if (msgEl) {
                    setMessage(msgEl, '', '');
                }
                updateProgress();
                updateStatus(null);
            }
        };
    }

    // Add event listeners
    fullName.addEventListener('blur', attachBlur(validateName));
    fullName.addEventListener('input', attachInput(validateName));

    email.addEventListener('blur', attachBlur(validateEmail));
    email.addEventListener('input', attachInput(validateEmail));

    phone.addEventListener('blur', attachBlur(validatePhone));
    phone.addEventListener('input', attachInput(validatePhone));

    age.addEventListener('blur', attachBlur(validateAge));
    age.addEventListener('input', attachInput(validateAge));

    country.addEventListener('blur', attachBlur(validateCountry));
    country.addEventListener('change', attachBlur(validateCountry));

    subject.addEventListener('blur', attachBlur(validateSubject));
    subject.addEventListener('change', attachBlur(validateSubject));

    message.addEventListener('blur', attachBlur(validateMessage));
    message.addEventListener('input', attachInput(validateMessage));

    // Submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const allValid = validateAll();
        updateStatus(allValid);

        if (allValid) {
            const data = {
                name: fullName.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                age: age.value.trim(),
                country: country.value,
                subject: subject.value,
                message: message.value.trim()
            };
            
            console.log('✅ Form submitted successfully:', data);
            
            // Add data to panel
            addDataToPanel(data);
            
            // Update button
            const btn = document.querySelector('.btn');
            btn.classList.add('submitted');
            btn.innerHTML = '<span class="btn-icon">🎉</span> <span>Submitted!</span> <span class="btn-shine"></span>';
            setTimeout(() => {
                btn.classList.remove('submitted');
                btn.innerHTML = '<span class="btn-icon">🚀</span> <span>Submit Form</span> <span class="btn-shine"></span>';
            }, 3000);

            // Show success message
            formStatus.textContent = '🎉 Submitted!';
            formStatus.className = 'status-badge success';
            
            // Highlight all fields as success
            document.querySelectorAll('input, select, textarea').forEach(el => {
                if (el.value && el.value.trim() !== '') {
                    el.classList.add('success');
                }
            });

            // Auto-scroll to data panel on mobile
            if (window.innerWidth < 900) {
                document.getElementById('dataPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            const firstInvalid = form.querySelector('.error');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            updateStatus(false);
        }
    });

    // Clear data
    clearBtn.addEventListener('click', function() {
        submittedData = [];
        renderData();
        formStatus.textContent = '🗑️ Cleared';
        formStatus.className = 'status-badge';
        setTimeout(() => {
            updateStatus(null);
        }, 1500);
        document.querySelectorAll('.success').forEach(el => {
            el.classList.remove('success');
        });
    });

    // Initial setup
    updateCounters();
    updateProgress();
    updateStatus(null);
    renderData();

    // Live counter updates
    fullName.addEventListener('input', updateCounters);
    message.addEventListener('input', updateCounters);

    // Keyboard shortcut: Ctrl+Enter to submit
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
})();