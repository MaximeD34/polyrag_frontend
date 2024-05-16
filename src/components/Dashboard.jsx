function Dashboard({ data }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {data.username}!</h2>
      <p>Email: {data.email}</p>
      {/* Add more user information here */}
    </div>
  );
}

export default Dashboard;
