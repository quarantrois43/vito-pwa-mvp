import { ReactNode } from 'react'

// Notez l'ajout du mot-clé `async` et du type `Promise<...>`
export default async function LocaleLayout({ 
  children,
  params 
}: { 
  children: ReactNode
  params: Promise<{ locale: string }> // ✅ Les params sont bien une promesse
}) {
  // ✅ Résolution de la promesse pour obtenir l'objet `locale`
  const { locale } = await params
  
  // Maintenant vous pouvez utiliser `locale` si besoin (pour i18n, etc.)
  // Par exemple : const messages = await getMessages(locale)
  
  return <>{children}</>
}