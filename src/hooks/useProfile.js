import { useMemo, useSyncExternalStore } from "react"
import { getAllProfiles, subscribeProfiles } from "../services/profileService"
import { DUMMY_AVATAR } from "../data/dummyReports"
import { profilePage } from "../data/content"

/** Profil pengguna (tersimpan di browser), dilengkapi nilai dummy bawaan. */
export default function useProfile(user) {
  const profiles = useSyncExternalStore(subscribeProfiles, getAllProfiles)
  const stored = profiles[user.userId]
  return useMemo(
    () => ({
      name: user.name,
      email: user.email,
      avatar: DUMMY_AVATAR,
      ...profilePage.defaults,
      ...stored,
    }),
    [stored, user.name, user.email],
  )
}
