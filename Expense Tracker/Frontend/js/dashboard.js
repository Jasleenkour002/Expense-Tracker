(function () {
  const token = getToken();
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const user = getUser();
  document.getElementById("userLabel").textContent = user ? `${user.name} (${user.email})` : "";

  document.getElementById("logoutBtn").addEventListener("click", () => {
    clearToken();
    window.location.href = "index.html";
  });

  // default date = today for add form
  document.getElementById("date").valueAsDate = new Date();

  document.getElementById("expenseForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: document.getElementById("title").value.trim(),
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        note: document.getElementById("note").value.trim(),
      };

      await apiFetch("/expenses", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      e.target.reset();
      document.getElementById("date").valueAsDate = new Date();

      showAlert("alertBox", "Expense added successfully.", "success");
      await loadExpenses();
    } catch (err) {
      showAlert("alertBox", err.message, "danger");
    }
  });

  document.getElementById("applyBtn").addEventListener("click", loadExpenses);

  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("filterCategory").value = "";
    document.getElementById("q").value = "";
    loadExpenses();
  });

  async function loadExpenses() {
    try {
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      const category = document.getElementById("filterCategory").value;
      const q = document.getElementById("q").value.trim();

      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (category) params.set("category", category);
      if (q) params.set("q", q);

      const list = await apiFetch(`/expenses?${params.toString()}`);

      renderRows(list);
      renderSummary(list);
    } catch (err) {
      // if token invalid/expired
      if (String(err.message).toLowerCase().includes("token")) {
        clearToken();
        window.location.href = "index.html";
        return;
      }
      showAlert("alertBox", err.message, "danger");
    }
  }

  function renderRows(items) {
    const tbody = document.getElementById("expenseRows");

    if (!items.length) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-muted">No expenses found.</td></tr>`;
      return;
    }

    tbody.innerHTML = items
      .map((x) => {
        const d = new Date(x.date);
        const dateStr = d.toISOString().slice(0, 10);

        return `
          <tr>
            <td>${dateStr}</td>
            <td>
              <div class="fw-semibold">${escapeHtml(x.title)}</div>
              ${x.note ? `<div class="text-muted small">${escapeHtml(x.note)}</div>` : ""}
            </td>
            <td><span class="badge text-bg-secondary">${x.category}</span></td>
            <td class="text-end fw-semibold">₹${Number(x.amount).toFixed(2)}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-danger" data-id="${x._id}">Delete</button>
            </td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll("button[data-id]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (!confirm("Delete this expense?")) return;
        try {
          await apiFetch(`/expenses/${id}`, { method: "DELETE" });
          await loadExpenses();
        } catch (err) {
          showAlert("alertBox", err.message, "danger");
        }
      });
    });
  }

  function renderSummary(items) {
    const total = items.reduce((sum, x) => sum + Number(x.amount || 0), 0);
    document.getElementById("totalAmount").textContent = `₹${total.toFixed(2)}`;
    document.getElementById("totalCount").textContent = String(items.length);
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  loadExpenses();
})();
