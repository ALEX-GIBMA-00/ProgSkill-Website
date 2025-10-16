const form = document.getElementById('order-form');
const nameEl = document.getElementById('name');
const phoneEl = document.getElementById('phone');
const msgEl = document.getElementById('form-msg')
const btn = document.getElementById('submit-btn');

function setError(el, message) {
    el.classList.add('error');
    msgEl.textContent = message;
    msgEl.className = 'error';
}

function clearError() {
    [nameEl, phoneEl].forEach(e => e.classList.remove('error'));
    msgEl.textContent = '';
    msgEl.className = '';
}

function validName(v) {
    return v.trim().length >= 2;
}
function validPhone(v) {
    const digits = v.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <=15;
}

form?.addEventListener('submit', async e => {
    e.preventDefault();
    clearError();

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();

    if (!validName(name)) return setError(nameEl, 'Вкажіть імʼя від двох символів.');
    if (!validPhone(phone)) return setError(phoneEl, 'Телефон: 10-15 цифр, можна з +, пробілами.')

    btn.disabled = true;
    btn.textContent = 'Відправляю...';

    try {
        const res = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name, phone, source: 'GreenBite'})
        });
    

    if (!res.ok) throw new Error('Network');
    msgEl.textContent = 'Дякую! Заявку отримано.';
    msgEl.className = 'ok';
    form.reset();
  }   catch {
    msgEl.textContent = 'Помилка мережі. Спробуйте ще раз.';
    msgEl.className = 'error';
  }   finally {
    btn.disabled = false;
    btn.textContent = 'Замовити';
  }

});