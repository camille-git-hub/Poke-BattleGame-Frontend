import {Outlet} from 'react-router-dom';

function AuthRoute({}) {

  return (
    <div className="">
      <header className="">
      </header>
      <main className="p-4 max-w-4xl mx-auto mb-40">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthRoute;

