export default function ParticipantsList({ participants, onRemove }) {
  return (
    <ul>
      {participants.map((p) => (
        <li key={p.user._id}>
          {p.user.name} ({p.user.email || p.user.phone})
          <button onClick={() => onRemove(p.user._id)} style={{ marginLeft: 10 }}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
