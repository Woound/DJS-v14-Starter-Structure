/**

Checks if an existing command is different from a local command.
@param {object} existingCommand - The existing command object.
@param {object} localCommand - The local command object.
@returns {boolean} - Indicates whether the existing command is different from the local command.
/
/*
Checks if choices in existing and local options are different.

@param {Array} existingChoices - The existing choices array.

@param {Array} localChoices - The local choices array.

@returns {boolean} - Indicates whether the choices are different.
*/

module.exports = (existingCommand, localCommand) => {
  const areChoicesDifferent = (existingChoices, localChoices) => {
    for (const localChoice of localChoices) {
      const existingChoice = existingChoices?.find(
        choice => choice.name === localChoice.name
      );

      if (!existingChoice) {
        return true;
      }

      if (existingChoice.value !== localChoice.value) {
        return true;
      }
    }
    return false;
  };

  /**
    
    Checks if options in existing and local commands are different.
    
    @param {Array} existingOptions - The existing options array.
    
    @param {Array} localOptions - The local options array.
    
    @returns {boolean} - Indicates whether the options are different.
    */

  const areOptionsDifferent = (existingOptions, localOptions) => {
    for (const localOption of localOptions) {
      const existingOption = existingOptions?.find(
        option => option.name === localOption.name
      );

      if (!existingOption) {
        return true;
      }

      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !== existingOption.required ||
        (localOption.choices?.length || 0) !==
          (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
          localOption.choices || [],
          existingOption.choices || []
        )
      ) {
        return true;
      }
    }
    return false;
  };

  // Check if the description, options length, or options are different between the existing and local commands.
  if (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
  ) {
    return true;
  }
  return false;
};
