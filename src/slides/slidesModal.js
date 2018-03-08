import m from "mithril";
import { assoc } from "ramda";
import { saveSlideTask } from "../services/requests.js";

const SlidesModal = ({ attrs }) => {
  const state = {
    errors: "",
    title: "",
  };

  const onError = errors => {
    log("error")(errors);
    state.errors = errors;
  };

  const onSuccess = slide => {
    attrs.slides.push(slide);
    attrs.toggleModal();
  };

  const save = e => {
    e.preventDefault();
    let dto = assoc(
      "presentationId",
      attrs.pId,
      assoc("title", state.title, attrs.slide)
    );
    saveSlideTask(dto).fork(onError, onSuccess);
  };

  return {
    view: () =>
      m(".modal", [
        m(".modal-background"),
        m(".modal-content", [
          m("fieldset.fieldset", [
            m("legend.legend", "Add a Slide"),
            m("label.label", "Slide title"),
            m("input.input", {
              type: "text",
              onchange: m.withAttr("value", v => (state.title = v)),
            }),
            m("button.button", { onclick: save }, "Create Slide"),
          ]),
        ]),
        m("button.modal-close is-large", {
          onclick: () => {
            return attrs.toggleModal();
          },
          "aria-label": "close",
        }),
      ]),
  };
};

export default SlidesModal;
