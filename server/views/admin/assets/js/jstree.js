$(document).ready(async function() {
  $(".new-menu").click(async function() {
    let links = [{ id: "home", parent: "#", text: "Home" }];
    var menu = {
      data: { title: "New Menu", contentType: "menu", links: links }
    };

    // debugger;
    await submitContent(menu);
    fullPageUpdate();
  });

  if (!$("#menuTree").length) {
    return;
  }

  $.jstree.defaults.core.data;
  $.jstree.defaults.core.check_callback = true;

  // let data = [{"id":"6e0ylrz3jei","text":"Hello world","icon":true,"li_attr":{"id":"6e0ylrz3jei"},"a_attr":{"href":"#","id":"6e0ylrz3jei_anchor"},"state":{"loaded":true,"opened":false,"selected":false,"disabled":false},"data":{},"parent":"#"},{"id":"hhcfvv536od","text":"Hello world","icon":true,"li_attr":{"id":"hhcfvv536od"},"a_attr":{"href":"#","id":"hhcfvv536od_anchor"},"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"data":{},"parent":"#"},{"id":"0obhtupblz0g","text":"Hello world","icon":true,"li_attr":{"id":"0obhtupblz0g"},"a_attr":{"href":"#","id":"0obhtupblz0g_anchor"},"state":{"loaded":true,"opened":false,"selected":false,"disabled":false},"data":{},"parent":"hhcfvv536od"},{"id":"4dv3m57umea","text":"Hello world","icon":true,"li_attr":{"id":"4dv3m57umea"},"a_attr":{"href":"#","id":"4dv3m57umea_anchor"},"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"data":{},"parent":"#"},{"id":"5fuafoc66db","text":"Hello world","icon":true,"li_attr":{"id":"5fuafoc66db"},"a_attr":{"href":"#","id":"5fuafoc66db_anchor"},"state":{"loaded":true,"opened":false,"selected":false,"disabled":false},"data":{},"parent":"4dv3m57umea"},{"id":"ykmqwe7m2dp","text":"Hello world","icon":true,"li_attr":{"id":"ykmqwe7m2dp"},"a_attr":{"href":"#","id":"ykmqwe7m2dp_anchor"},"state":{"loaded":true,"opened":false,"selected":true,"disabled":false},"data":{},"parent":"4dv3m57umea"}];
  $("#menuTree").jstree({
    core: {
      data: menuData
    },

    dnd: {
      drop_finish: function() {
        alert("DROP");
      },

      drag_check: function(data) {
        if (data.r.attr("id") == "phtml_1") {
          return false;
        }

        return {
          after: false,
          before: false,
          inside: true
        };
      },
      drag_finish: function(data) {
        alert("DRAG OK");
      }
    },

    types: {
      default: {
        icon: "fa fa-chevron-right"
      },
      demo: {
        icon: "fa fa-home"
      }
    },

    plugins: ["dnd", "types"]
  });

  $("#menuTree").on("changed.jstree", async function(e, data) {
    if (!data.selected) {
      return;
    }

    let content = {};
    if (data && data.node && data.node.data) {
      content = { data: data.node.data };
    } else {
      return;
    }

    debugger;

    let form = await formService.getForm(
      "menu",
      content,
      "addModuleToColumn(submission)"
    );

    // debugger;

    $("#menuTreeForm").html(form);

    formInit();
  });

  $("#menuTree").bind("loaded.jstree", function(e, data) {
    // debugger;
    $(this).jstree("open_all");
    // $('#menuTree').jstree('select_node', 'ul > li:first');
    // $('#menuTree').jstree('select_node', 'someNodeId');
    $("#menuTree")
      .jstree()
      .deselect_all(true);

    $("#menuTree").jstree("select_node", ".jstree-container-ul li:first");
  });

  $("#addNode").on("click", function() {
    let randomId = Math.random()
      .toString(36)
      .slice(2);
    var parent = "#";
    var node = { id: randomId, text: "Hello world" };
    let newId = $("#menuTree").jstree("create_node", parent, node, "last");
    console.log(newId);
  });

  $("#save").on("click", function() {
    updateTreeData();
  });

  $("#menuMainEdit").on("change", "#title", function() {
    updateTreeData();
  });
});

function updateTreeData(formData) {
  var selectedNode = $("#menuTree").jstree("get_selected", true);

  var links = $("#menuTree")
    .jstree(true)
    .get_json("#", { flat: true });

  debugger;

  // let obj = objArray.find(obj => obj.id == 3);
  if (selectedNode && formData) {
    //update tree text via form value
    links.find(obj => obj.id == selectedNode[0].id).data = formData.data;
    $("#menuTree").jstree("rename_node", selectedNode[0], formData.data.title);
    selectedNode[0].text = formData.data.title;
  }

  let menuTitle = $("#menuMainEdit #title").val();
  var menu = { data: { title: menuTitle, contentType: "menu", links: links } };

  let id = $("#id").val();
  if (id) {
    menu.data.id = id;
  }

  // debugger;
  submitContent(menu);
}

function formChanged(formData) {
  if (!$("#menuTree").length) {
    return;
  }
  console.log("jstree formData", formData);
  updateTreeData(formData);
}
