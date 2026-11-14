const FALLBACK_ERROR_MESSAGE = 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń do nas.';

type StatusKind = 'success' | 'error' | 'pending';

interface ContactFormResponse {
  ok?: boolean;
  message?: string;
}

const statusClasses: Record<StatusKind, string[]> = {
  success: ['border', 'border-gold-400/50', 'bg-gold-400/10', 'text-gold-200'],
  error: ['border', 'border-red-400/60', 'bg-red-500/10', 'text-red-200'],
  pending: ['text-mist'],
};

function showStatus(element: HTMLElement, kind: StatusKind, message: string) {
  element.classList.remove('hidden', ...Object.values(statusClasses).flat());
  element.classList.add(...statusClasses[kind]);
  element.textContent = message;
}

function preselectTopicFromQuery(form: HTMLFormElement) {
  const requestedTopic = new URLSearchParams(window.location.search).get('temat');
  const select = form.querySelector<HTMLSelectElement>('[data-topic-select]');
  if (!requestedTopic || !select) return;
  const hasOption = [...select.options].some((option) => option.value === requestedTopic);
  if (hasOption) select.value = requestedTopic;
}

function stampStartTime(form: HTMLFormElement) {
  const startedAt = form.querySelector<HTMLInputElement>('[data-started-at]');
  if (startedAt) startedAt.value = String(Date.now());
}

async function submitForm(form: HTMLFormElement): Promise<Required<ContactFormResponse>> {
  const response = await fetch(form.action, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
  });
  const result = (await response.json().catch(() => ({}))) as ContactFormResponse;
  return {
    ok: response.ok && result.ok === true,
    message: result.message ?? FALLBACK_ERROR_MESSAGE,
  };
}

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const status = form?.querySelector<HTMLElement>('[data-form-status]');
  const submitButton = form?.querySelector<HTMLButtonElement>('[data-submit]');
  if (!form || !status || !submitButton) return;

  preselectTopicFromQuery(form);
  stampStartTime(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    showStatus(status, 'pending', 'Wysyłanie…');
    try {
      const result = await submitForm(form);
      showStatus(status, result.ok ? 'success' : 'error', result.message);
      if (result.ok) {
        form.reset();
        stampStartTime(form);
      }
    } catch {
      showStatus(status, 'error', FALLBACK_ERROR_MESSAGE);
    } finally {
      submitButton.disabled = false;
    }
  });
}
