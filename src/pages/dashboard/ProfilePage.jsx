import { useEffect, useId, useRef } from "react"
import { useOutletContext } from "react-router"
import ProfileAvatar from "../../components/profile/ProfileAvatar/ProfileAvatar"
import ReportCountCard from "../../components/profile/ReportCountCard/ReportCountCard"
import InlineField from "../../components/profile/InlineField/InlineField"
import ContactItem from "../../components/profile/ContactItem/ContactItem"
import { CheckIcon, PencilIcon } from "../../components/icons/DashboardIcons"
import { MailIcon, PhoneIcon } from "../../components/icons/UiIcons"
import { useMyReports } from "../../hooks/useReports"
import useProfile from "../../hooks/useProfile"
import useProfileForm from "../../hooks/useProfileForm"
import useToast from "../../hooks/useToast"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import { PROFILE_LIMITS } from "../../utils/validation"
import { provinces } from "../../data/provinces"
import { profilePage } from "../../data/content"
import "./ProfilePage.css"

const { fields } = profilePage

export default function ProfilePage() {
  useDocumentTitle("Profile — JAGAFasum")
  const { user } = useOutletContext()
  const { show } = useToast()
  const reports = useMyReports(user.userId)
  const profile = useProfile(user)
  const form = useProfileForm(user.userId, profile)
  const { editing, draft, errors, saving } = form
  const view = editing ? draft : profile
  const nameRef = useRef(null)
  const descId = useId()

  // Fokus ke kolom nama saat masuk mode edit.
  useEffect(() => {
    if (editing) nameRef.current?.focus()
  }, [editing])

  const bind = (name) => ({
    name,
    value: draft[name],
    error: errors[name],
    disabled: saving,
    onChange: (event) => form.setField(name, event.target.value),
  })

  const handleCancel = () => {
    if (form.dirty) show(profilePage.cancelled, { tone: "info" })
    form.cancel()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const result = await form.submit()
    if (result.ok) show(profilePage.saved)
    else if (result.errors) {
      const first = Object.keys(result.errors)[0]
      formElement.querySelector(`[name="${first}"]`)?.focus()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && editing && !saving) handleCancel()
  }

  // Kolom kosong di kartu memakai kata "Provinsi" seperti desain.
  const provinceText = view.province || profilePage.provincePlaceholder
  const provinceOptions = provinces.includes(draft.province)
    ? provinces
    : [draft.province, ...provinces].filter(Boolean)

  return (
    <div className="profile">
      <h1 className="profile__title">{profilePage.title}</h1>

      <form className="profile__form" onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
        <section
          className={`profile__card${editing ? " is-editing" : ""}`}
          aria-label="Informasi akun"
        >
          <div className="profile__top">
            <ProfileAvatar
              src={view.avatar}
              name={view.name}
              editing={editing}
              onChange={(dataUrl) => form.setField("avatar", dataUrl)}
              onError={(message) => show(message, { tone: "info" })}
            />

            <div className="profile__identity">
              {editing ? (
                <>
                  <InlineField
                    ref={nameRef}
                    size="lg"
                    label={fields.name}
                    autoComplete="name"
                    maxLength={PROFILE_LIMITS.name + 10}
                    {...bind("name")}
                  />
                  <InlineField
                    size="md"
                    className="profile__province-field"
                    label={fields.province}
                    options={provinceOptions}
                    {...bind("province")}
                  />
                </>
              ) : (
                <>
                  <p className="profile__name">{view.name}</p>
                  <p className="profile__province">{provinceText}</p>
                </>
              )}
            </div>

            <ReportCountCard label={profilePage.reportCount} count={reports.length} />
          </div>

          <div className="profile__contacts">
            <ContactItem
              icon={MailIcon}
              tone="mail"
              label={fields.email}
              href={`mailto:${view.email}`}
              editing={editing}
              type="email"
              inputMode="email"
              autoComplete="email"
              {...bind("email")}
              value={view.email}
            />
            <ContactItem
              icon={PhoneIcon}
              tone="phone"
              label={fields.phone}
              href={`tel:${view.phone}`}
              editing={editing}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              {...bind("phone")}
              value={view.phone}
            />
          </div>
        </section>

        <div className={`profile__desc${editing ? " is-editing" : ""}`}>
          <label htmlFor={descId} className="profile__desc-label">
            {profilePage.description}
          </label>
          <textarea
            id={descId}
            name="description"
            className="profile__desc-input"
            value={view.description}
            readOnly={!editing}
            disabled={saving}
            placeholder={editing ? profilePage.descriptionPlaceholder : ""}
            maxLength={PROFILE_LIMITS.description}
            aria-invalid={errors.description ? "true" : undefined}
            onChange={(event) => form.setField("description", event.target.value)}
          />
          {editing && (
            <span className="profile__desc-count" aria-live="polite">
              {draft.description.length}/{PROFILE_LIMITS.description}
            </span>
          )}
        </div>

        {errors.form && (
          <p className="profile__form-error" role="alert">
            {errors.form}
          </p>
        )}

        <div className="profile__actions">
          {editing ? (
            <>
              <button
                key="save"
                type="submit"
                className={`profile__btn profile__btn--save${saving ? " is-loading" : ""}`}
                disabled={saving}
              >
                {saving && <span className="profile__spinner" aria-hidden="true" />}
                <span>{profilePage.save}</span>
                <CheckIcon className="profile__btn-icon" />
              </button>
              <button
                key="cancel"
                type="button"
                className="profile__btn profile__btn--ghost"
                onClick={handleCancel}
                disabled={saving}
              >
                {profilePage.cancel}
              </button>
            </>
          ) : (
            <button key="edit" type="button" className="profile__btn" onClick={form.start}>
              <span>{profilePage.edit}</span>
              <PencilIcon className="profile__btn-icon profile__btn-icon--pencil" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
