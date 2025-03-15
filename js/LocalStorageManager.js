class LocalStorageManager {
  constructor() {
    this.storageKey = "gameState"; // Klucz do przechowywania stanu gry
  }

  saveGameState(state) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  loadGameState() {
    const savedState = localStorage.getItem(this.storageKey);
    return savedState ? JSON.parse(savedState) : null;
  }

  clearGameState() {
    localStorage.removeItem(this.storageKey);
  }
}
