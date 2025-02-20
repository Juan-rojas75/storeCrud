/**
 * Convierte un valor a una representaci n de cadena amigable para el usuario.
 * - Booleanos se convierten en "✔️ Sí" o "❌ No".
 * - Arreglos se convierten en una cadena separada por comas.
 * - Objetos se convierten en una cadena con el nombre del objeto.
 * - Valores nulos o undefined se convierten en "—".
 * - Los dem s valores se dejan como est n.
 * @param value El valor a convertir.
 * @returns La representaci n de cadena del valor.
 */
export  function formatValue(value: any): string {
    if (typeof value === "boolean") {
      return value ? "✔️ Sí" : "❌ No"; // Para booleanos
    }
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.join(", ");
      }
      else if (value.name) {
        return value.name;
      }
    }
    return value ?? "—";
  }