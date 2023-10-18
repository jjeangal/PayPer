import { Web3AuthModalPack } from '@safe-global/auth-kit'

type AppBarProps = {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>
}

export default function AppBar ({ isLoggedIn, onLogin, onLogout, userInfo }: AppBarProps) {
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-black shadow-md">
      <p>
        Auth Provider Demo
      </p>

      <div className="mr-5">
        {isLoggedIn ? (
            <div className="flex">
                    {userInfo && (
                    <div>
                        Hello {userInfo.name || userInfo.email} !!
                    </div>
                    )}
                    <button type="button" onClick={onLogout} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Log Out
                    </button>
            </div>
        ) : (
            <button type="button" onClick={onLogin} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Login
            </button>
        )}
      </div>
    </div>
  )
}