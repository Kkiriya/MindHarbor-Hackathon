import type {AnalysisRange} from "../../types/AnalysisTypes.ts";
import styles from "../../pages/AnalysisPage.module.css";

interface Props {
    range: AnalysisRange;
    onChange: (range: AnalysisRange) => void;
}

const ranges: AnalysisRange[] = ["7d", "30d", "90d"];

export default function AnalysisPeriodSelector({range, onChange}: Props) {
    return (
        <fieldset className={styles.rangeSelector}>
            <legend>Période analysée</legend>

            {ranges.map((value) => (
                <label key={value}>
                    <input
                        type="radio"
                        name="analysisRange"
                        value={value}
                        checked={range === value}
                        onChange={() => onChange(value)}
                    />
                    {value.replace("d", " jours")}
                </label>
            ))}
        </fieldset>
    );
}
