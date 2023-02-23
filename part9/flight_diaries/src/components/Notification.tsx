const Notification = ({
  message,
  messageClass,
}: {
  message: string | null;
  messageClass: string;
}) => {
  if (message === null) {
    return null;
  }

  return <div className={messageClass}>{message}</div>;
};

export default Notification;
