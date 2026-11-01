import { useRef } from "react"
import ImageSlot from "../../ui/ImageSlot/ImageSlot"
import { ImageIcon } from "../../icons/UiIcons"
import StatCard from "./StatCard"
import useParallax from "../../../hooks/useParallax"
import { hero, stats } from "../../../data/content"
import { IMAGE_SLOTS, getImageUrl } from "../../../data/images"
import "./Hero.css"

export default function Hero() {
  const mediaRef = useRef(null)
  useParallax(mediaRef, { factor: 0.25 })
  // Petunjuk wadah gambar hanya saat development & selama foto hero belum ada.
  const showSlotHint = import.meta.env.DEV && !getImageUrl("hero")

  return (
    <section className="hero" id="beranda" aria-labelledby="hero-title">
      <div className="hero__media" ref={mediaRef}>
        <ImageSlot
          slot="hero"
          tone="hero"
          className="hero__image"
          decorative
          priority
          showHint={false}
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            {hero.title}
          </h1>
          <h2 className="hero__welcome">
            {hero.welcome.before}
            <span className="hero__accent">{hero.welcome.highlight}</span>
          </h2>
          <p className="hero__lead">{hero.lead}</p>
        </div>

        <div className="hero__stats">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              index={index}
            />
          ))}
        </div>
      </div>

      {showSlotHint && (
        <p className="hero__slot-hint">
          <ImageIcon className="hero__slot-hint-icon" />
          <span>
            <strong>{IMAGE_SLOTS.hero.label}</strong> ·
            src/assets/images/hero.jpg · {IMAGE_SLOTS.hero.size}
          </span>
        </p>
      )}
    </section>
  )
}
