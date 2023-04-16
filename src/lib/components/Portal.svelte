<script lang="ts">
  function portal(node: HTMLElement) {
    let target: HTMLElement | null;

    function update() {
      target = document.querySelector('body');
      target?.appendChild(node); //append Element passed div + slot in Body Tag
      node.hidden = false;
    }

    function destroy() {
      if (node.parentNode) {
        node.parentNode.removeChild(node); //destroy div
      }
    }

    update();

    return { update, destroy };
  }
</script>

<div hidden use:portal>
  <slot><!-- optional fallback --></slot>
</div>
