import './main.scss'

type ModalProps = {
  close: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ close, children }) => {
  // TODO: figure out how to clean this up
  /*
  document.addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 27) close()
  })
  */

  return (
    <div className="modal" onClick={close}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <div className="row modal-header">
          <h3>set prices</h3>
          <button onClick={close}>close</button>
        </div>

        {children}

        <div className="modal-footer"></div>
      </div>
    </div>
  )
}
