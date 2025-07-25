import { useState, useEffect } from 'react';

function Dashboard() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {  // Ajout d'une vérification que user n'est pas null
      const parsedUser = JSON.parse(user);
      setFirstname(parsedUser.firstname);
      setLastname(parsedUser.lastname);
      setAvatar(parsedUser.avatar);
    }
  }, []);

  return (
    <>
      <div>
        Admin : {firstname} {lastname}
        <img src={avatar} alt="" width={100} height={100} />
      </div>
      <h1>Dashboard</h1>
      <div>
        Dashboard main
      </div>
    </>
  );
}

export default Dashboard;
