import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

export default function Layout({ preview, children }: any) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}