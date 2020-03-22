import React from "react";
import axios from "axios";
import io from "socket.io-client";
import { Menu, LoggedIn, Notice } from "../../globals/components";
import connect from "../../connect.js";

function Chat(props) {
  var comp = [];
  for (var i = 0; i < props.data.length; ++i) {
    comp.push(
      <div key={`${i}${props.data[i].message}`}>
        <p>
          <b>{props.data[i].chat_role ? "listener " : "venter "}</b>
          {props.data[i].message}
        </p>
      </div>
    );
  }
  return comp;
}

function Activity(props) {
  if (props.data !== "") {
    return (
      <p style={{ margin: "0px" }}>
        <b>{`activity: ${props.data}`}</b>
      </p>
    );
  } else {
    return (
      <p style={{ margin: "0px" }}>
        <b>activity:</b>
      </p>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      info: { categ: "", chat_role: false },
      waiting: true,
      chat: [],
      ended: false
    };
    this.socket = null;
  }

  ended() {
    this.setState({ ended: true });
  }

  updateChat(prop) {
    this.setState({ chat: prop }, () => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  score(data) {
    try {
      if (data.error) {
        throw new Error(data.error.detail);
      }
      if (this.state.info.chat_role === data.data.chat_role) {
        this.props.history.push("/taki/dashboard");
      }
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  scoreMenu() {
    return [
      [
        "Positive",
        function() {
          this.socket.emit("score", { score: true });
        }.bind(this)
      ],
      [
        "Neutral",
        function() {
          this.props.history.push("/taki/dashboard");
        }.bind(this)
      ],
      [
        "Negative",
        function() {
          this.socket.emit("score", { score: false });
        }.bind(this)
      ]
    ];
  }

  async join(data) {
    try {
      if (data.error) {
        throw new Error(data.error.detail);
      }
      const response = await axios.get(`${process.env.REACT_APP_API}/chat/identify/${this.props.match.params.chat_id}`);
      if (response.data.error) {
        throw new Error(data.error.detail);
      }
      this.setState({ info: response.data.data });
      this.setState({ waiting: data.data.waiting });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  outgoingMessage() {
    const chatbox = document.getElementById("chatbox");
    this.socket.emit(`message`, { message: chatbox.value });
    chatbox.value = "";
  }

  incomingMessage(data) {
    try {
      if (data.error) {
        throw new Error(data.error.detail);
      }
      const chat = JSON.parse(JSON.stringify(this.state.chat));
      chat.push({ chat_role: data.data.chat_role, message: data.data.message });
      this.updateChat(chat);
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  outgoingActivity(data) {
    if (data.activity === "typing") {
      this.socket.emit("typing");
    }
  }

  typingActivity(data) {
    try {
      if (data.error) {
        throw new Error(data.error.detail);
      }
      if (this.state.info.chat_role !== data.data.chat_role) {
        this.setState({ activity: `${data.data.chat_role ? "listener" : "venter"} typing...` });
        setTimeout(() => {
          this.setState({ activity: "" });
        }, 500);
      }
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  disconnectActivity(data) {
    try {
      if (data.error) {
        throw new Error(data.error.detail);
      }
      if (this.state.info.chat_role !== data.data.chat_role) {
        this.setState({ activity: `${data.data.chat_role ? "listener" : "venter"} disconnected...` });
      }
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  connect() {
    try {
      this.socket = io(`/`);
      this.socket.on(`join/${this.props.match.params.chat_id}`, this.join.bind(this));
      this.socket.on(`message/${this.props.match.params.chat_id}`, this.incomingMessage.bind(this));
      this.socket.on(`typing/${this.props.match.params.chat_id}`, this.typingActivity.bind(this));
      this.socket.on(`disconnect/${this.props.match.params.chat_id}`, this.disconnectActivity.bind(this));
      this.socket.on(`score/${this.props.match.params.chat_id}`, this.score.bind(this));
      this.socket.emit("join", { chat_id: this.props.match.params.chat_id });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async componentDidMount() {
    await this.connect();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    if (this.state.waiting) {
      return (
        <div>
          <h1>Chat</h1>
          <Notice />
          <hr />
          <h2>searching for a perfect stranger...</h2>
          <img alt="animated cat walking" src={`${process.env.REACT_APP_API}/images/loading.gif`} />
        </div>
      );
    }

    if (this.state.ended) {
      return (
        <div>
          <Notice />
          <h2>How would you rate your conversation?</h2>
          <Menu data={this.scoreMenu()} />
        </div>
      );
    }

    return (
      <div>
        <h1>Chat</h1>
        <Notice />
        <hr />
        <p>
          <b>{`${this.state.info.chat_role ? "listening" : "venting"} - ${this.state.info.categ}`}</b>
        </p>
        <Chat data={this.state.chat} />
        <button onClick={this.ended.bind(this)}>end chat</button>
        <textarea
          onChange={function() {
            this.outgoingActivity({ activity: "typing" });
          }.bind(this)}
          id="chatbox"
        />
        <Activity data={this.state.activity} />
        <button onClick={this.outgoingMessage.bind(this)} style={{ float: "right" }}>
          send
        </button>
      </div>
    );
  }
}
export default connect(Main);
