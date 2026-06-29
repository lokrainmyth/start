class IoStorage {
  saveIndex(i) {
    localStorage.setItem("io_index", i);
  }

  getIndex() {
    return Number(localStorage.getItem("io_index") || 0);
  }

  saveCompleted(i) {
    const d = this.getCompleted();
    if (!d.includes(i)) d.push(i);
    localStorage.setItem("io_completed", JSON.stringify(d));
  }

  getCompleted() {
    return JSON.parse(localStorage.getItem("io_completed") || "[]");
  }

  saveState(s) {
    localStorage.setItem("io_state", s);
  }

  getState() {
    return localStorage.getItem("io_state") || "night";
  }
}
