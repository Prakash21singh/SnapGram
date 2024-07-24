const Sender = ({ message }: { message: any }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero to minutes if needed
    return `${hours}:${strMinutes} ${ampm}`;
  };

  return (
    <li className="sender">
      {message?.message}
      <div className="time">{formatTime(message.$createdAt)}</div>
    </li>
  );
};

export default Sender;
