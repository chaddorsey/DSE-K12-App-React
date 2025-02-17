import { useAuth } from '../AuthContext';

export const Navbar = () => {
  const { user, userClaims, signOut } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white flex gap-2">
          <span>{user?.email}</span>
          {userClaims?.role && (
            <span className="px-2 py-1 bg-gray-700 rounded-md text-sm">
              Role: {userClaims.role}
            </span>
          )}
        </div>
        <button
          onClick={signOut}
          className="text-white hover:text-gray-300"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}; 