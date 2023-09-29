import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { PotentialChats } from "../components/Chat/PotentialChats.jsx";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../components/Chat/UserChat.jsx";
import ChatBox from "../components/Chat/ChatBox.jsx";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { updateCurrentChat, isUserChatsLoading, userChats } =
    useContext(ChatContext);
  //   console.log(currentChat);

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start  centered">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => (updateCurrentChat(chat))}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
