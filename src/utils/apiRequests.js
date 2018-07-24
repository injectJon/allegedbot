import fetch from 'node-fetch';

// AllegedBot API Requests ------------------------------------------------

export const fetchGuilds = function fetchGuilds() {
  return new Promise( ( resolve, reject ) => {
    fetch( `${ process.env.API_PATH }/guilds` )
      .then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }
        resolve( body.guilds );
      } );
  } );
};

export const createGuild = function createGuild( guild ) {
  return new Promise( ( resolve, reject ) => {
    const body = {
      // apiKey: process.env.API_KEY,
      guildId: guild.id,
      admins: guild.owner.id,
    };

    fetch(
      `${ process.env.API_PATH }/guilds`,
      {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body );
      } );

  } );
};

export const updateGuild = function updateGuild( guild_id, status ) {
  return new Promise( ( resolve, reject ) => {
    const body = {
      // apiKey: process.env.API_KEY,
      status,
    };
    fetch(
      `${ process.env.API_PATH }/guilds/${ guild_id }`,
      {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body.updatedGuild );
      } );
  } );
}

export const updateGuildFeatures = function updateGuildFeatures( guild, feature, state ) {
  return new Promise( ( resolve, reject ) => {
    const body = {
      feature,
      state,
    };

    fetch(
      `${ process.env.API_PATH }/guilds/${ guild._id }/features`,
      {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body )
          return;
        }

        resolve( body.updatedGuild );
      } );
  } );
};

export const fetchCommands = function fetchCommands( guild ) {
  return new Promise( ( resolve, reject ) => {

    const guild_id = guild._id;
    fetch( `${ process.env.API_PATH }/${ guild_id }/commands` )
      .then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body.commands );
      } );

  } );
};

export const deleteCommand = function deleteCommand( command_id ) {
  return new Promise( ( resolve, reject ) => {
    const body = {
      // apiKey: process.env.API_KEY,
    };
    fetch(
      `${ process.env.API_PATH }/${ 1234 }/commands/${ command_id }`,
      {
        method: 'DELETE',
        // body: JSON.stringify( body ),
        // headers: { 'Content-Type': 'application/json' }
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body );
      } )

  } );
};

export const createCommand = function createCommand( guild_Id, code, response, complex, tools ) {
  return new Promise( ( resolve, reject ) => {

    const body = {
      // apiKey: process.env.API_KEY,
      guildId: guild_Id,
      code,
      response,
      complex,
      tools
    };

    fetch(
      `${ process.env.API_PATH }/${ guild_Id }/commands`,
      {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body.command );
      } );

  } );
};

export const updateCommand = function updateCommand( command ) {
  return new Promise( ( resolve, reject ) => {

    const body = {
      // apiKey: process.env.API_KEY,
      commandId: command._id,
      guildId: command.guildId,
      code: command.code,
      response: command.response,
      complex: command.complex,
      tools: command.tools,
    };

    fetch(
      `${ process.env.API_PATH }/1234/commands/${ body.commandId }`,
      {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body );
      } );

  } );
};
