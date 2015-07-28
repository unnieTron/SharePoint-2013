function ChangePermissions(groupMembershipID,permissionLevel) {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        var clientContext = SP.ClientContext.get_current();
        var web = clientContext.get_web();
        //Get Role Definition by name
        var roleDef = web.get_roleDefinitions().getByName(permissionLevel);
        var roleDefBinding = SP.RoleDefinitionBindingCollection.newObject(clientContext);
        // Add the role to the role definiiton binding.
        roleDefBinding.add(roleDef);
        // Get the RoleAssignmentCollection for the web.
        var assignments = web.get_roleAssignments();
        //Get the role assignment for the group using Group  's membership id
        var groupRoleAssignment = assignments.getByPrincipalId(groupMembershipID);
        groupRoleAssignment.importRoleDefinitionBindings(roleDefBinding);
        groupRoleAssignment.update();
        clientContext.executeQueryAsync(function () {
            alert("Permissions changed !");
        },
                function (sender, args) {
                    console.log(args.get_message());
                });
    });
}
