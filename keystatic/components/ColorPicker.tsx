import type { BasicFormField } from '@keystatic/core';

export const colorPickerField = ({
    label,
    defaultValue = '#000000',
    description,
}: {
    label: string;
    defaultValue?: string;
    description?: string;
}): BasicFormField<string> => {
    return {
        kind: 'form',
        label,
        Input({ value, onChange, autoFocus }) {
            return (
                <div className="custom-color-picker" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                    <style>{`
                        .custom-color-picker {
                            --description-color: #efe;
                            --code-bg: white;
                            --code-color: black;
                            --code-border: #ddd;
                        }
                        html.kui-scheme--light .custom-color-picker {
                            --description-color: #444;
                            --code-color: #111;
                            --code-bg: #f5f5f5;
                            --code-border: #bbb;
                        }
                    `}</style>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: '18px', marginBottom: '4px' }}>{label}</div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="color"
                                value={value || '#000000'}
                                onChange={(e) => onChange(e.target.value)}
                                autoFocus={autoFocus}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    padding: '2px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: 'white'
                                }}
                            />
                            <code style={{
                                fontSize: '14px',
                                padding: '4px 8px',
                                backgroundColor: 'var(--code-bg)',
                                borderRadius: '4px',
                                border: '1px solid var(--code-border)',
                                minWidth: '80px',
                                textAlign: 'center',
                                color: 'var(--code-color)'

                            }}>
                                {value}
                            </code>
                        </div>
                        {description && (
                            <div style={{ fontSize: '14px', color: 'var(--description-color)', marginTop: '8px' }}>
                                {description}
                            </div>
                        )}
                    </div>
                </div>
            );
        },
        defaultValue() {
            return defaultValue;
        },
        parse(value) {
            if (typeof value !== 'string') return defaultValue;
            return value;
        },
        serialize(value) {
            return { value };
        },
        validate(value) {
            return value;
        },
        reader: {
            parse(value) {
                if (typeof value !== 'string') return defaultValue;
                return value;
            },
        },
    };
};
