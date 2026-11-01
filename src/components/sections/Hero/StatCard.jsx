import { useRef } from "react"
import useInView from "../../../hooks/useInView"
import useCountUp from "../../../hooks/useCountUp"
import { formatNumber } from "../../../utils/format"
import "./StatCard.css"

/** Kartu statistik miring yang melayang; angkanya menghitung naik saat terlihat. */
export default function StatCard({ label, value, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.4, rootMargin: "0px" })
  const count = useCountUp(value, { start: inView, delay: 650 + index * 150 })

  return (
    <div ref={ref} className={`stat-card stat-card--${index + 1}`}>
      <div className="stat-card__float">
        <div className="stat-card__body">
          <p className="stat-card__label">{label}</p>
          <p className="stat-card__value">
            <span aria-hidden="true">{formatNumber(count)}</span>
            <span className="u-visually-hidden">{formatNumber(value)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
