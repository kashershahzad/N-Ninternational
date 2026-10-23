"use client";

import { Fragment } from "react";
import { SiteEffects } from "@/components/SiteEffects";
import content from "@/data/site-content.json";

/** Spinning product card — hero + category float cards use this. */
function FloatCard({
  name,
  url,
  ariaLabel,
  image,
  imageAlt,
  backLabelLines,
  price,
  visitHint,
}: {
  name: string;
  url: string;
  ariaLabel: string;
  image: string;
  imageAlt: string;
  backLabelLines: string[];
  price: string;
  visitHint: string;
}) {
  return (
    <a
      className="pfloat-card"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="pf-name">{name}</span>
      <span className="pf-spin">
        <span className="pf-face pf-front">
          <img src={image} alt={imageAlt} loading="lazy" />
        </span>
        <span className="pf-face pf-back">
          <b>
            {backLabelLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </b>
        </span>
      </span>
      <span className="price-tag">{price}</span>
      <span className="visit-hint">{visitHint}</span>
    </a>
  );
}

export default function HomePage() {
  const {
    brand,
    nav,
    hero,
    philosophy,
    brands,
    shop,
    categories,
    expectations,
    contact,
    footer,
  } = content;

  return (
    <>
      <SiteEffects />

      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="progress" id="bar" aria-hidden="true" />

      <header className="nav" id="nav">
        <div className="nav-in">
          <a
            className="brand"
            href={brand.homeHref}
            aria-label={brand.ariaLabel}
          >
            <b>{brand.name}</b>
            <small>{brand.tagline}</small>
          </a>
          <nav aria-label="Main">
            <ul className="links" id="links">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a className="ul" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="burger"
            id="burger"
            type="button"
            aria-expanded={false}
            aria-controls="links"
            aria-label={nav.menuOpenLabel}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        {/* Hero — site-content.json → hero */}
        <section className="scene hero" id="top">
          <div className="col intro">
            <p className="kicker">{hero.kicker}</p>
            <h1>
              {hero.titleBefore}
              <em>{hero.titleEmphasized}</em>
            </h1>
            <p style={{ marginTop: "1.6rem", fontSize: "1.15rem" }}>
              {hero.description}
            </p>
            <div className="row">
              <a className="btn solid" href={hero.primaryCta.href}>
                {hero.primaryCta.label} <span className="arr">→</span>
              </a>
              <a className="btn" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="pfloat-slot">
            <FloatCard {...hero.featuredProduct} />
          </div>

          <div className="cue">
            <i aria-hidden="true" />
            {hero.scrollCue}
          </div>
        </section>

        {/* Philosophy — site-content.json → philosophy */}
        <section className="scene c" id="philosophy">
          <div className="rv">
            <p className="kicker">{philosophy.kicker}</p>
            <h2 className="big">{philosophy.title}</h2>
            <p style={{ marginTop: "1.6rem" }}>{philosophy.description}</p>
          </div>
        </section>

        {/* Brands — site-content.json → brands.items */}
        <section className="sec" id="brands">
          <p className="kicker rv">{brands.kicker}</p>
          <h2 className="rv">{brands.title}</h2>
          <div className="bgrid">
            {brands.items.map((item) => (
              <a
                key={item.id}
                className="tilt rv"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
              >
                <span className="price-tag">{item.price}</span>
                <div className="prod-photo">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                </div>
                <span className="tag">{item.tag}</span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="visit-line">
                    {brands.visitLabel} <span className="arr">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="note">{brands.note}</p>
        </section>

        {/* Shop — site-content.json → shop.products */}
        <section className="shop-sec" id="shop">
          <p className="kicker rv">{shop.kicker}</p>
          <h2 className="rv">{shop.title}</h2>
          <p className="rv" style={{ marginTop: "1rem" }}>
            {shop.description}
          </p>

          <div className="shop-grid">
            {shop.products.map((product) => (
              <article key={product.id} className="shop-card rv">
                <div className="shop-imgwrap">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                  />
                </div>
                <span className="shop-tag">{product.tag}</span>
                <h3 className="shop-name">{product.name}</h3>
                <p className="shop-desc">{product.description}</p>
                <div className="shop-foot">
                  <span className="shop-price">{product.price}</span>
                  <a className="btn solid shop-btn" href={product.href}>
                    {shop.ctaLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="note">{shop.note}</p>
        </section>

        {/* Categories — site-content.json → categories.items */}
        {categories.items.map((cat) => (
          <section
            key={cat.id}
            className={`scene${cat.reversed ? " r" : ""}`}
            id={"sectionId" in cat && cat.sectionId ? cat.sectionId : undefined}
          >
            <div className="col rv">
              <p className="kicker">{cat.kicker}</p>
              <h2>{cat.title}</h2>
              <p style={{ marginTop: "1.2rem" }}>{cat.description}</p>
              <a
                className="pbadge"
                href={cat.badge.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="pb-photo">
                  <img src={cat.badge.image} alt={cat.badge.imageAlt} />
                </span>
                <div>
                  <strong>{cat.badge.title}</strong>
                  <small>{cat.badge.subtitle}</small>
                </div>
                <span className="pb-price">{cat.badge.price}</span>
              </a>
            </div>

            <div className="pfloat-slot">
              <FloatCard {...cat.floatCard} />
            </div>
          </section>
        ))}

        {/* Expectations — site-content.json → expectations */}
        <section className="sec">
          <h2 className="rv">{expectations.title}</h2>
          <div className="trio rv">
            {expectations.items.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact — site-content.json → contact */}
        <section className="scene c" id="contact">
          <div className="rv">
            <h2 className="big">{contact.title}</h2>
            <p style={{ margin: "1.6rem auto 0" }}>{contact.description}</p>
            <div className="row" style={{ justifyContent: "center" }}>
              <a className="btn solid" href={contact.ctaHref}>
                {contact.ctaLabel} <span className="arr">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="fg">
          <div className="fb">
            <b>{footer.name}</b>
            <span className="assoc">{footer.associates}</span>
            <p style={{ marginTop: "1.2rem" }}>{footer.blurb}</p>
          </div>
          <div>
            <h4>{footer.peopleHeading}</h4>
            <ul className="own">
              {footer.people.map((person) => (
                <li key={person.name}>
                  {"role" in person && person.role ? (
                    <span className="role">{person.role}</span>
                  ) : null}
                  <span className="nm">{person.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{footer.exploreHeading}</h4>
            <ul className="fl">
              {nav.links
                .filter((link) => link.href !== "#philosophy")
                .map((link) => (
                  <li key={link.href}>
                    <a className="ul" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>
            © <span id="yr">2026</span> {footer.copyrightSuffix}
          </span>
          <span>{footer.associates}</span>
        </div>
      </footer>

      <button className="top" id="topb" type="button" aria-label={footer.backToTopLabel}>
        ↑
      </button>
    </>
  );
}
