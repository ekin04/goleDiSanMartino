import { singleton, fields } from "@keystatic/core";
import { colorPickerField } from "../components/ColorPicker";
export const settings = singleton({
    label: "⚙️ Settings",
    path: "src/content/settings",
    format: { data: "json" },
    schema: {
        color: colorPickerField({ label: 'Colore', defaultValue: '#FF0000', description: 'Colore principale, applicato a bottoni e link' }),
        colorHover: colorPickerField({ label: 'Colore Hover', defaultValue: '#FF0000', description: 'Colore quando si passa sopra con il mouse' }),
        colorActive: colorPickerField({ label: 'Colore Active', defaultValue: '#FF0000', description: 'Colore principale' }),
        colorDisabled: colorPickerField({ label: 'Colore Disabled', defaultValue: '#FF0000', description: 'Colore principale' }),
    },
});
