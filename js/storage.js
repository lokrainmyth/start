/* =========================
   storage.js — Io First Light
   Memory / persistence layer
   ========================= */

class IoStorage {
  constructor() {
    this.keys = {
      index: "io_current_index",
      completed: "io_completed_tracks",
      skipped: "io_skipped_tracks",
      state: "io_world_state"
    };
  }

  /* =========================
     INDEX (current position)
     ========================= */

  saveIndex(index) {
    localStorage.setItem(this.keys.index, String(index));
  }

  getIndex() {
    const v = localStorage.getItem(this.keys.index);
    return v === null ? 0 : Number(v);
  }

  /* =========================
     COMPLETED TRACKS
     ========================= */

  saveCompleted(index) {
    const list = this.getCompleted();
    if (!list.includes(index)) {
      list.push(index);
      localStorage.setItem(this.keys.completed, JSON.stringify(list));
    }
  }

  getCompleted() {
    const raw = localStorage.getItem(this.keys.completed);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  /* =========================
     SKIPPED TRACKS
     ========================= */

  saveSkipped(index) {
    const list = this.getSkipped();
    if (!list.includes(index)) {
      list.push(index);
      localStorage.setItem(this.keys.skipped, JSON.stringify(list));
    }
  }

  getSkipped() {
    const raw = localStorage.getItem(this.keys.skipped);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  /* =========================
     WORLD STATE
     ========================= */

  saveState(state) {
    localStorage.setItem(this.keys.state, state);
  }

  getState() {
    return localStorage.getItem(this.keys.state) || "night";
  }

  /* =========================
     RESET (for testing / rebirth)
     ========================= */

  reset() {
    Object.values(this.keys).forEach((k) => localStorage.removeItem(k));
  }
}

window.IoStorage = IoStorage;
