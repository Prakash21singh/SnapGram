const Sender = ({ message }: { message: any }) => {
  return (
    <li className="sender">
      {message?.message}
      <div className="time">{`${
        new Date(message.$createdAt).getHours() - 12
      }:${new Date(message.$createdAt).getHours()} ${
        new Date(message.$createdAt).getHours() > 12 ? "PM" : "AM"
      }`}</div>
    </li>
  );
};

export default Sender;
