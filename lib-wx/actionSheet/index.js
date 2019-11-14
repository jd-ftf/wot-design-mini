import VueComponent from '../common/component';
VueComponent({
  props: {
    show: Boolean,
    actions: {
      type: Array,
      value: []
    },
    title: String,
    cancelText: String,
    closeOnClickAction: {
      type: Boolean,
      value: true
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 300
    },
    zIndex: {
      type: Number,
      value: 10
    }
  },
  methods: {
    select({
      currentTarget
    }) {
      const index = currentTarget.dataset.index;
      this.$emit('select', {
        item: this.data.actions[index],
        index
      });
      this.close();
    },

    handleClickModal() {
      this.$emit('click-modal');

      if (this.data.closeOnClickModal) {
        this.close();
      }
    },

    handleCancel() {
      this.$emit('cancel');
      this.close();
    },

    close() {
      this.$emit('close');
    },

    handleOpen() {
      this.$emit('open');
    },

    handleOpened() {
      this.$emit('opened');
    },

    handleClosed() {
      this.$emit('closed');
    }

  }
});