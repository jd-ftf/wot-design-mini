import VueComponent from '../common/component';
import transition from '../mixins/transition';
VueComponent({
  mixins: [transition()],
  props: {
    transition: {
      type: String,
      observer: 'observerTransition'
    },
    closable: Boolean,
    position: {
      type: String,
      value: 'center',
      observer: 'observerTransition'
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    modal: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 10
    },
    hideWhenClose: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    handleClickModal() {
      this.$emit('clickmodal');

      if (this.data.closeOnClickModal) {
        this.$emit('close');
      }
    },

    observerTransition() {
      const {
        transition,
        position
      } = this.data;
      const data = {
        name: transition || position
      };

      if (transition === 'none') {
        data.duration = 0;
      }

      this.setData(data);
    },

    close() {
      this.$emit('close');
    }

  },

  created() {
    this.observerTransition();
  }

});