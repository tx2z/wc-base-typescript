import { app, Component, Update /*View*/, VNode } from 'apprun';
import * as interfaces from './apprun.component.interfaces';
// Adding JSX.Element to View type not included in apprun definition
type View<T> = (state: T, props?: any[]) => string | VNode | VNode[] | JSX.Element | void;

type Events = 'buttonClick';

export default class ApprunComponent extends Component<interfaces.State, Events> {
  public state = {
    hello: 'Hello There!',
  };

  public update: Update<interfaces.State, Events> = [
    [
      'buttonClick',
      state => {
        const newState = {
          testMessage: 'hola hola',
        };
        return { ...state, ...newState };
      },
    ],
  ];

  public view: View<interfaces.State> = ({ hello, testMessage }) => (
    <>
      <style>
        {`
        apprun-component {
          border: 1px black dotted;
          display: inline-block;
          padding: 5px;
        }
        `}
      </style>
      {hello}
      <br />
      <button $onclick='buttonClick'>Test button</button>
      <p>{testMessage}</p>
      <p>
        Attribute value:
        <br />
        <small>
          You can change the data-attribute in the inspector or do some fancy stuf inside of outside
          the component with JS :{')'}
        </small>
      </p>
    </>
  );
}
